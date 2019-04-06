import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import { Input, Button, Flex, FormIcon, AccountForm } from '../Generic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = e => {
        const { passwordOne } = this.state;
        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(()=> {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        e.preventDefault();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
        return (
            <AccountForm onSubmit={this.onSubmit}>
                <Flex vcenter>
                    <FormIcon>
                        <FontAwesomeIcon icon="key" />
                    </FormIcon>
                    <Input
                        width100
                        name="passwordOne"
                        value={passwordOne}
                        type="password"
                        onChange={this.onChange}
                        placeholder="New Password"
                    />
                </Flex>
                <Flex vcenter>
                    <FormIcon>
                        <FontAwesomeIcon icon="key" />
                    </FormIcon>
                    <Input
                        width100
                        name="passwordTwo"
                        value={passwordTwo}
                        type="password"
                        onChange={this.onChange}
                        placeholder="Confirm New Password"
                    />
                </Flex>
                <Button disabled={isInvalid} type="submit">Update Password</Button>

                {error && <p>{error.message}</p>}
            </AccountForm>
        );
    }
}

export default withFirebase(PasswordChangeForm);