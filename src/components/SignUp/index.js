import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Button, Flex, FormIcon, AccountForm, AccountFormBox } from '../Generic';

const SignUpPage = () => (
    <AccountFormBox>
        <h1>Sign Up</h1>
        <SignUpForm />
    </AccountFormBox>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    isModerator: false,
    isEditor: true,
    error: null
}

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const { username, email, isAdmin, isModerator, isEditor, passwordOne } = this.state;
        
        const roles = [];
        if (isAdmin) roles.push(ROLES.ADMIN);
        if (isModerator) roles.push(ROLES.MODERATOR);
        if (isEditor) roles.push(ROLES.EDITOR);

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email, 
                        roles
                });
            })
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error })
            });

        e.preventDefault();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return (
            <AccountForm onSubmit={this.onSubmit}>
                <Flex vcenter>
                    <FormIcon>
                        <FontAwesomeIcon icon="user" fixedWidth />
                    </FormIcon>
                    <Input
                        width100
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Full Name"
                    />
                </Flex>
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
                        placeholder="Email"
                    />
                </Flex>
                <Flex vcenter>
                    <FormIcon>
                        <FontAwesomeIcon icon="key" fixedWidth />
                    </FormIcon>
                    <Input
                        width100
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                </Flex>
                <Flex vcenter>
                    <FormIcon>
                        <FontAwesomeIcon icon="key" fixedWidth />
                    </FormIcon>
                    <Input
                        width100
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Flex>
                <Button disabled={isInvalid} type="submit">Sign Up!</Button>

                {error && <p>{error.message}</p>}
            </AccountForm>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };