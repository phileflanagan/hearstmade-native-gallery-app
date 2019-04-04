import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Input, Button, Center, AccountForm } from '../Generic';

const PasswordForgetPage = () => (
    <Center>
        <h1>Forgot Password</h1>
        <PasswordForgetForm />
    </Center>
);

const INITIAL_STATE = {
    email: '',
    error: null
}

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = e => {
        const { email } = this.state;
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch(error => {
                this.setState({ error })
            });
        
        e.preventDefault();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { email, error } = this.state;
        const isInvalid = email === '';
        return (
            <AccountForm onSubmit={this.onSubmit}>
                <Input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <Button disabled={isInvalid} type="submit">Reset My Password</Button>

                {error && <p>{error.message}</p>}
            </AccountForm>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink};