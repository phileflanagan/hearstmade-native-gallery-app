import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthorization = condition => Component => {
	class WithAuthorization extends React.Component {
		componentDidMount() {
			this.listener = this.props.firebase.onAuthUserListener(
				authUser => {
					if (!condition(authUser)) this.props.history.push(ROUTES.SIGN_IN);
				},
				() => {
					this.props.history.push(ROUTES.SIGN_IN);
				}
			);
		}

		componentWillUnmount() {
			this.listener && this.listener();
		}

		render() {
			return (
				<AuthUserContext.Consumer>
					{authUser =>
						condition(authUser) ? <Component {...this.props} /> : null
					}
				</AuthUserContext.Consumer>
			);
		}
	}

	return compose(
		withRouter,
		withFirebase
	)(WithAuthorization);
};

export default withAuthorization;

// import React, { useContext, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'recompose';

// import * as ROUTES from '../../constants/routes';
// import AuthUserContext from './context';
// import { withFirebase } from '../Firebase';

// const withAuthorization = condition => Component => {
// 	const WithAuthorization = props => {
// 		const authUser = useContext(AuthUserContext);

// 		useEffect(() => {
// 			const listener = props.firebase.onAuthUserListener(
// 				authUser => {
// 					if (!condition(authUser)) props.history.push(ROUTES.SIGN_IN);
// 				},
// 				() => {
// 					props.history.push(ROUTES.SIGN_IN);
// 				}
// 			);

// 			return () => {
// 				if (listener) listener();
// 			};
// 		}, []);

// 		return condition(authUser) ? <Component {...props} /> : null;
// 	};

// 	return compose(
// 		withRouter,
// 		withFirebase
// 	)(WithAuthorization);
// };

// export default withAuthorization;
