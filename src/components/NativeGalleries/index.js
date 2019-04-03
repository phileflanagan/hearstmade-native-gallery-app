import React from 'react';
import { compose } from 'recompose';
import { Switch, Route, Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withAuthorization, withEmailVerification } from '../Session';
import NativeGalleries from './nativeGalleries';
import { NativeGallery } from '../NativeGallery';

const NativeGalleriesPage = () => (
    <div>
        <h1>Native Galleries</h1>
        <Switch>
            <Route exact path={ROUTES.NATIVEGALLERY_CREATE} component={NativeGallery} />
            <Route exact path={ROUTES.NATIVEGALLERY_LIST} component={NativeGalleries} />
        </Switch>
    </div>
);
    
const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(NativeGalleriesPage)