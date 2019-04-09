import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
	class WithAuthentication extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				authUser: JSON.parse(localStorage.getItem('authUser'))
			};
		}

		componentDidMount() {
			this.listener = this.props.firebase.onAuthUserListener(
				authUser => {
					localStorage.setItem('authUser', JSON.stringify(authUser));
					this.setState({ authUser });
				},
				() => {
					localStorage.removeItem('authUser');
					this.setState({ authUser: null });
				}
			);
		}

		componentWillUnmount() {
			this.listener && this.listener();
		}

		render() {
			return (
				<AuthUserContext.Provider value={this.state.authUser}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}

	return withFirebase(WithAuthentication);
};

export default withAuthentication;
// import React, { useState, useEffect } from 'react';

// import AuthUserContext from './context';
// import { withFirebase } from '../Firebase';

// const withAuthentication = Component => {
// 	const WithAuthentication = props => {
// 		const [authUser, setAuthUser] = useState(
// 			JSON.parse(localStorage.getItem('authUser'))
// 		);

// 		useEffect(() => {
// 			const listener = props.firebase.onAuthUserListener(
// 				authUserFromFirebase => {
// 					localStorage.setItem(
// 						'authUser',
// 						JSON.stringify(authUserFromFirebase)
// 					);
// 					setAuthUser(authUserFromFirebase);
// 				},
// 				() => {
// 					localStorage.removeItem('authUser');
// 					setAuthUser(null);
// 				}
// 			);
// 			return () => {
// 				if (listener) listener();
// 			};
// 		}, []);

// 		return (
// 			<AuthUserContext.Provider value={authUser}>
// 				<Component {...props} />
// 			</AuthUserContext.Provider>
// 		);
// 	};

// 	return withFirebase(WithAuthentication);
// };

// export default withAuthentication;
