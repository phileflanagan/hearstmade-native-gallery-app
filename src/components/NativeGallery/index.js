import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import NativeGallery from './nativeGallery';

// const NativeGalleryPage = ({nativeGallery}) => (
//     <div>
//         <h1>{nativeGallery ? nativeGallery.projectName : <h1>Create Native</h1>}</h1>
//         <NativeGallery nativeGallery={nativeGallery} />
//     </div>
// );

class NativeGalleryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nativeGallery: null,
            ...props.location.state
        }
    }

    render() {
        const { nativeGallery } = this.state;
        return (
            <div>
                <h1>{nativeGallery ? nativeGallery.projectName + ' / ' + nativeGallery.uid : 'Create Native'}</h1>
                <NativeGallery nativeGallery={nativeGallery} />
            </div>
        );
    }

}
    
const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(NativeGalleryPage)

export { NativeGallery };