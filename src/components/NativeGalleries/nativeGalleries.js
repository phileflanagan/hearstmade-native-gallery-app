import React, { Component } from 'react';
// import { compose } from 'recompose';

// import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class NativeGalleriesBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            nativeGalleries: null,
            loading: false,
        }
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
        this.props.firebase
            .users()
            .on('value', snapshot => {
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
                    const nativeGalleryList = Object.keys(nativeGalleriesObject).map(key => ({
                        ...nativeGalleriesObject[key],
                        uid: key
                    })).reverse();

                    this.setState({ 
                        nativeGalleries: nativeGalleryList, 
                        loading: false,
                    });   
                } else {
                    this.setState({ nativeGalleries: null, loading: false});
                }
            })
    }

    render() {
        const { users, nativeGalleries, loading} = this.state;
        return (
            <div>
                <button type="button"><Link to={ROUTES.NATIVEGALLERY_CREATE}>Create</Link></button>
                {loading && <div>Loading...</div>}
                {nativeGalleries && (
                    <NativeGalleryListTable
                        nativeGalleries={nativeGalleries.map(nativeGallery => ({
                            ...nativeGallery,
                            user: users
                                ? users[nativeGallery.userId]
                                : { userId: nativeGallery.userId },
                            }))}
                    />
                )}
                {!nativeGalleries && !loading && <div>No Native Galleries found.</div>}
            </div>
        );
    }
}

const NativeGalleryListTable = ({nativeGalleries}) => (
    <table>
        <thead>
            <tr>
                <th>Creator</th>
                <th>Project Name</th>
                <th>Card Count</th>
                <th>ID</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
        {nativeGalleries.map(nativeGallery => (
            <tr key={nativeGallery.uid}>
                <td>{nativeGallery.user.username || nativeGallery.user.userId}</td>
                <td>{nativeGallery.projectName}</td>
                <td>{nativeGallery.cardCount}</td>
                <td>{nativeGallery.uid}</td>
                <td><Link 
                        to={{
                            pathname: `${ROUTES.NATIVEGALLERY_LIST}/${nativeGallery.uid}`, 
                            state: { nativeGallery }
                        }}
                    >More</Link>
                </td>
            </tr>  
        ))}
        </tbody>
    </table>
);

export default withFirebase(NativeGalleriesBase);