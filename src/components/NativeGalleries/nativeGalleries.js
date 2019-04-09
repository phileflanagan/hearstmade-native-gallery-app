import React, { Component, useState, useEffect, useRef } from 'react';
// import { compose } from 'recompose';

// import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Right, Button, Tooltip } from '../Generic';

// const NativeGalleriesBase = props => {
// 	const [users, setUsers] = useState(null);
// 	const [nativeGalleries, setNativeGalleries] = useState(null);
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		props.firebase.users().on('value', snapshot => {
// 			setUsers(snapshot.val());
// 		});

// 		props.firebase
// 			.nativeGalleries()
// 			.orderByChild('createdAt')
// 			.on('value', snapshot => {
// 				const nativeGalleriesObject = snapshot.val();

// 				if (nativeGalleriesObject) {
// 					const nativeGalleryList = Object.keys(nativeGalleriesObject)
// 						.map(key => ({
// 							...nativeGalleriesObject[key],
// 							uid: key
// 						}))
// 						.reverse();
// 					setLoading(false);
// 					setNativeGalleries(nativeGalleryList);
// 				} else {
// 					setLoading(false);
// 					setNativeGalleries(null);
// 				}
// 			});

// 		return () => {
// 			props.firebase.nativeGalleries().off();
// 			props.firebase.users().off();
// 		};
// 	}, [users, nativeGalleries]);

// 	return (
// 		<div>
// 			<Link to={ROUTES.NATIVEGALLERY_CREATE}>
// 				<Button type="button">Create New Project</Button>
// 			</Link>
// 			{loading && <div>Loading...</div>}
// 			{nativeGalleries && (
// 				<NativeGalleryListTable
// 					nativeGalleries={nativeGalleries.map(nativeGallery => ({
// 						...nativeGallery,
// 						user: users
// 							? users[nativeGallery.userId]
// 							: { userId: nativeGallery.userId }
// 					}))}
// 				/>
// 			)}
// 			{!nativeGalleries && !loading && <div>No Native Galleries found.</div>}
// 		</div>
// 	);
// };
class NativeGalleriesBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null,
			nativeGalleries: null,
			loading: false
		};
	}

	componentDidMount() {
		this.onListenForUsers();
		this.onListenForNativeGalleries();
	}

	componentWillUnmount() {
		this.props.firebase.nativeGalleries().off();
		this.props.firebase.users().off();
	}

	onListenForUsers() {
		this.props.firebase.users().on('value', snapshot => {
			this.setState({
				users: snapshot.val()
			});
		});
	}

	onListenForNativeGalleries() {
		this.setState({ loading: true });
		this.props.firebase
			.nativeGalleries()
			.orderByChild('createdAt')
			.on('value', snapshot => {
				const nativeGalleriesObject = snapshot.val();

				if (nativeGalleriesObject) {
					const nativeGalleryList = Object.keys(nativeGalleriesObject)
						.map(key => ({
							...nativeGalleriesObject[key],
							uid: key
						}))
						.reverse();

					this.setState({
						nativeGalleries: nativeGalleryList,
						loading: false
					});
				} else {
					this.setState({ nativeGalleries: null, loading: false });
				}
			});
	}

	render() {
		const { users, nativeGalleries, loading } = this.state;
		return (
			<div>
				<Link to={ROUTES.NATIVEGALLERY_CREATE}>
					<Button type="button">Create New Project</Button>
				</Link>
				{loading && <div>Loading...</div>}
				{nativeGalleries && (
					<NativeGalleryListTable
						nativeGalleries={nativeGalleries.map(nativeGallery => ({
							...nativeGallery,
							user: users
								? users[nativeGallery.userId]
								: { userId: nativeGallery.userId }
						}))}
					/>
				)}
				{!nativeGalleries && !loading && <div>No Native Galleries found.</div>}
			</div>
		);
	}
}

// const NativeGalleryListTable = ({ nativeGalleries }) => {
// 	const [copySuccess, setCopySuccess] = useState('');
// 	const [copiedUid, setCopiedUid] = useState('');

// 	const references = {};

// 	const getOrCreateRef = uid => {
// 		if (!references.hasOwnProperty(uid)) {
// 			references[uid] = useRef(null);
// 		}
// 		return references[uid];
// 	};

// 	const clearCopied = () => {
// 		setTimeout(() => {
// 			setCopySuccess('');
// 			setCopiedUid('');
// 		}, 1000);
// 	};

// 	const onCopyToClipboard = (e, uid) => {
// 		references[uid].current.select();
// 		document.execCommand('copy');
// 		e.target.focus();
// 		setCopySuccess('Copied!');
// 		setCopiedUid(uid);
// 		clearCopied();
// 	};

// 	return (
// 		<div style={{ overflowX: 'auto' }}>
// 			<table>
// 				<thead>
// 					<tr>
// 						<th>Creator</th>
// 						<th>Project Name</th>
// 						<th>Card Count</th>
// 						<th>ID</th>
// 						<th />
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{nativeGalleries.map(nativeGallery => (
// 						<tr key={nativeGallery.uid}>
// 							<td>
// 								{nativeGallery.user.username || nativeGallery.user.userId}
// 							</td>
// 							<td>{nativeGallery.projectName}</td>
// 							<td>{nativeGallery.cardCount}</td>
// 							<td>{nativeGallery.uid}</td>
// 							<Right as="td">
// 								<input
// 									ref={getOrCreateRef(nativeGallery.uid)}
// 									type="text"
// 									target="link"
// 									style={{ position: 'absolute', left: '-9999px' }}
// 									defaultValue={`${
// 										process.env.REACT_APP_CLOUDFN_GETNATIVE
// 									}?id=${nativeGallery.uid}`}
// 								/>
// 								{document.queryCommandSupported('copy') && (
// 									<div>
// 										<Link
// 											to={{
// 												pathname: `${ROUTES.NATIVEGALLERY_LIST}/${
// 													nativeGallery.uid
// 												}`,
// 												state: { nativeGallery }
// 											}}
// 										>
// 											<Button light>
// 												<FontAwesomeIcon icon="eye" fixedWidth />
// 											</Button>
// 										</Link>
// 										<Button
// 											type="button"
// 											onClick={e => onCopyToClipboard(e, nativeGallery.uid)}
// 										>
// 											<FontAwesomeIcon icon="clipboard" fixedWidth />
// 										</Button>
// 									</div>
// 								)}
// 								{nativeGallery.uid === copiedUid && (
// 									<Tooltip>{copySuccess}</Tooltip>
// 								)}
// 							</Right>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };
class NativeGalleryListTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copySuccess: '',
			copiedUid: ''
		};
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	references = {};

	getOrCreateRef = uid => {
		if (!this.references.hasOwnProperty(uid)) {
			this.references[uid] = React.createRef();
		}
		return this.references[uid];
	};

	onCopyToClipboard = (e, uid) => {
		this.references[uid].current.select();
		document.execCommand('copy');
		e.target.focus();
		this.setState({
			copySuccess: 'Copied!',
			copiedUid: uid
		});
		this.clearCopied();
	};

	clearCopied = () => {
		this.timeout = setTimeout(() => {
			this.setState({
				copySuccess: '',
				copiedUid: ''
			});
		}, 1000);
	};

	render() {
		const { nativeGalleries } = this.props;
		return (
			<div style={{ overflowX: 'auto' }}>
				<table>
					<thead>
						<tr>
							<th>Creator</th>
							<th>Project Name</th>
							<th>Card Count</th>
							<th>ID</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{nativeGalleries.map(nativeGallery => (
							<tr key={nativeGallery.uid}>
								<td>
									{nativeGallery.user.username || nativeGallery.user.userId}
								</td>
								<td>{nativeGallery.projectName}</td>
								<td>{nativeGallery.cardCount}</td>
								<td>{nativeGallery.uid}</td>
								<Right as="td">
									<input
										ref={this.getOrCreateRef(nativeGallery.uid)}
										type="text"
										target="link"
										style={{ position: 'absolute', left: '-9999px' }}
										defaultValue={`${
											process.env.REACT_APP_CLOUDFN_GETNATIVE
										}?id=${nativeGallery.uid}`}
									/>
									{document.queryCommandSupported('copy') && (
										<div>
											<Link
												to={{
													pathname: `${ROUTES.NATIVEGALLERY_LIST}/${
														nativeGallery.uid
													}`,
													state: { nativeGallery }
												}}
											>
												<Button light>
													<FontAwesomeIcon icon="eye" fixedWidth />
												</Button>
											</Link>
											<Button
												type="button"
												onClick={e =>
													this.onCopyToClipboard(e, nativeGallery.uid)
												}
											>
												<FontAwesomeIcon icon="clipboard" fixedWidth />
											</Button>
										</div>
									)}
									{nativeGallery.uid === this.state.copiedUid && (
										<Tooltip>{this.state.copySuccess}</Tooltip>
									)}
								</Right>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default withFirebase(NativeGalleriesBase);
