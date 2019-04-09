import React, { useState } from 'react';

import { withFirebase } from '../Firebase';

import { Input, Button, Flex, FormIcon, AccountForm } from '../Generic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordChangeForm = props => {
	const [passwordOne, setPasswordOne] = useState('');
	const [passwordTwo, setPasswordTwo] = useState('');
	const [error, setError] = useState(null);

	const onSubmit = e => {
		const passWordOneCurrent = passwordOne;
		props.firebase
			.doPasswordUpdate(passWordOneCurrent)
			.then(() => {
				setPasswordOne('');
				setPasswordTwo('');
				setError(null);
			})
			.catch(error => {
				setError(error);
			});

		e.preventDefault();
	};

	const onChangePasswordOne = e => {
		setPasswordOne(e.target.value);
	};

	const onChangePasswordTwo = e => {
		setPasswordTwo(e.target.value);
	};

	const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
	return (
		<AccountForm onSubmit={onSubmit}>
			<Flex vcenter>
				<FormIcon>
					<FontAwesomeIcon icon="key" />
				</FormIcon>
				<Input
					width100
					name="passwordOne"
					value={passwordOne}
					type="password"
					onChange={e => onChangePasswordOne(e)}
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
					onChange={e => onChangePasswordTwo(e)}
					placeholder="Confirm New Password"
				/>
			</Flex>
			<Button disabled={isInvalid} type="submit">
				Update Password
			</Button>

			{error && <p>{error.message}</p>}
		</AccountForm>
	);
};

export default withFirebase(PasswordChangeForm);
