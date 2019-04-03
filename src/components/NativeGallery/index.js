import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import NativeGallery from './nativeGallery';

const NativeGalleryPage = ({nativeGallery}) => (
    <div>
        <h1>Native Gallery</h1>
    </div>
);
    
const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(NativeGalleryPage)

export { NativeGallery };