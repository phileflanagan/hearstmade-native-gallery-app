import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';

import { AccountFormBox } from '../Generic';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <AccountFormBox>
                <h1>Your Account</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </AccountFormBox>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(AccountPage)