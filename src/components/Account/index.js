// Main
import React from 'react';
import { compose } from 'recompose';

// Pages, HOCs, and Contexts
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, withEmailVerification } from '../Session';

// Styled Components
import { AccountFormBox } from '../Generic';

const AccountPage = () => (
	<AccountFormBox>
		<h1>Your Account</h1>
		<PasswordForgetForm />
		<PasswordChangeForm />
	</AccountFormBox>
);

const condition = authUser => !!authUser;

export default compose(
	withEmailVerification,
	withAuthorization(condition)
)(AccountPage);
