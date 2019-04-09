import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {
	Input,
	Button,
	Flex,
	FormIcon,
	AccountForm,
	AccountFormBox
} from '../Generic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordForgetPage = () => (
	<AccountFormBox>
		<h1>Forgot Password</h1>
		<PasswordForgetForm />
	</AccountFormBox>
);

const PasswordForgetFormBase = props => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState(null);

	const onSubmit = e => {
		const emailCurrent = email;
		props.firebase
			.doPasswordReset(emailCurrent)
			.then(() => {
				setEmail('');
				setError(null);
			})
			.catch(error => {
				setError(error);
			});

		e.preventDefault();
	};

	const onChangeEmail = e => {
		setEmail(e.target.value);
	};

	const isInvalid = email === '';

	return (
		<AccountForm onSubmit={() => onSubmit()}>
			<Flex vcenter>
				<FormIcon>
					<FontAwesomeIcon icon="envelope" />
				</FormIcon>
				<Input
					width100
					name="email"
					value={email}
					onChange={e => onChangeEmail(e)}
					type="text"
					placeholder="Email Address"
				/>
			</Flex>
			<Button disabled={isInvalid} type="submit">
				Reset My Password
			</Button>

			{error && <p>{error.message}</p>}
		</AccountForm>
	);
};

const PasswordForgetLink = () => (
	<p>
		<Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
	</p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
