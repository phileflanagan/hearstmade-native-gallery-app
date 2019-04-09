import React, { Fragment, useState, useContext } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

import { Button } from '../Generic';
const needsEmailVerification = authUser =>
	authUser &&
	!authUser.emailVerified &&
	authUser.providerData
		.map(provider => provider.providerId)
		.includes('password');

const withEmailVerification = Component => {
	const WithEmailVerification = props => {
		const [isSent, setIsSent] = useState(false);
		const authUser = useContext(AuthUserContext);

		const onSendEmailVerification = () => {
			props.firebase.doSendEmailVerification().then(() => {
				setIsSent(true);
			});
		};

		return (
			<Fragment>
				{needsEmailVerification(authUser) ? (
					<div>
						{isSent ? (
							<div>
								<p>
									Email confirmation sent: Check your emails for a confirmation
									email. Refresh once you've confirmed your email address.
								</p>
							</div>
						) : (
							<div>
								<p>
									Verify your email: Check your emails for a confirmation email
									or send another.
								</p>
								<Button
									type="button"
									disabled={isSent}
									onClick={() => onSendEmailVerification()}
								>
									Resend Confirmation Email
								</Button>
							</div>
						)}
					</div>
				) : (
					<Component {...props} />
				)}
			</Fragment>
		);
	};
	return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
