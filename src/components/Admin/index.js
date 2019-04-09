// Main
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

// Pages, HOCs, and Contexts
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';

// Constants
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

// Styled Components
import { Button } from '../Generic';

const AdminPage = props => (
	<div>
		<h1>Admin Page</h1>
		<Switch>
			<Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
			<Route exact path={ROUTES.ADMIN} component={UserList} />
		</Switch>
	</div>
);

const UserListBase = props => {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		setLoading(true);
		props.firebase.users().on('value', snapshot => {
			const usersObj = snapshot.val();
			const usersList = Object.keys(usersObj).map(key => ({
				...usersObj[key],
				uid: key
			}));
			setUsers(usersList);
			setLoading(false);
		});

		return () => {
			props.firebase.users().off();
		};
	}, [users]);

	return (
		<div>
			<h2>Users</h2>
			{loading && <div>Loading...</div>}
			<UserListTable {...props} users={users} />
		</div>
	);
};

const UserItemBase = props => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [sent, setSent] = useState(false);

	useEffect(() => {
		if (user) return;
		setLoading(true);
		props.firebase.user(props.match.params.id).on('value', snapshot => {
			setUser(snapshot.val());
			setLoading(false);
		});

		return () => {
			props.firebase.user(props.match.params.id).off();
		};
	}, [user]);

	const onSendPasswordResetEmail = () => {
		props.firebase
			.doPasswordReset(user.email)
			.then(() => {
				setSent(true);
			})
			.catch(error => {
				setError(error);
			});
	};

	return (
		<div>
			<h2>User ({props.match.params.id})</h2>
			{loading && <div>Loading...</div>}
			{user && (
				<div>
					<UserItemTable user={user} />

					<Button
						disabled={sent}
						type="button"
						onClick={() => onSendPasswordResetEmail()}
					>
						Send Password Reset
					</Button>
					{sent && <div>Email sent!</div>}
					{error && <div>{error}</div>}
				</div>
			)}
		</div>
	);
};

const UserListTable = ({ users }) => (
	<div style={{ overflowX: 'auto' }}>
		<table>
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>ID</th>
					<th>Details</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => (
					<tr key={user.uid}>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>{user.uid}</td>
						<td>
							<Link
								to={{
									pathname: `${ROUTES.ADMIN}/${user.uid}`,
									state: { user }
								}}
							>
								More
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const UserItemTable = ({ user }) => (
	<div style={{ overflowX: 'auto' }}>
		<table>
			<thead>
				<tr>
					<th>Field</th>
					<th>Info</th>
				</tr>
			</thead>
			<tbody>
				<tr key={user.uid}>
					<td>Username</td>
					<td>{user.username}</td>
				</tr>
				<tr>
					<td>Email</td>
					<td>{user.email}</td>
				</tr>
				<tr>
					<td>Roles</td>
					<td>
						{user.roles.map((role, i) =>
							i < user.roles.length - 1 ? role + ', ' : role
						)}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
);

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
	withEmailVerification,
	withAuthorization(condition),
	withFirebase
)(AdminPage);
