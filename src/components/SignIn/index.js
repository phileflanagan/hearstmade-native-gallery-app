import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import { Input, Button, Flex, FormIcon, AccountForm, AccountFormBox } from '../Generic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignInPage = () => (
    <AccountFormBox>
        <h1>Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </AccountFormBox>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        e.preventDefault();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <AccountForm onSubmit={this.onSubmit}>
                <Flex vcenter>
                    <FormIcon>
                        <FontAwesomeIcon icon="envelope" fixedWidth />
                    </FormIcon>
                    <Input
                        width100
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                </Flex>
                <Flex vcenter>
                    <FormIcon>
                        <FontAwesomeIcon icon="key" fixedWidth />
                    </FormIcon>
                    <Input
                        width100
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                </Flex>
                <Button disabled={isInvalid} type="submit">Sign In</Button>

                {error && <p>{error.message}</p>}
            </AccountForm>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };

