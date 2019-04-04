import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SingUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import NativeGalleriesPage from '../NativeGalleries';
// import NativeGalleryPage from '../NativeGallery';
import AccountPage from '../Account';
import AdminPage from '../Admin'; 

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import { SiteContainer } from '../Generic';

const App = () => (
    <Router>
        <div>
            <Navigation />
            <SiteContainer padding>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_UP} component={SingUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.NATIVEGALLERY_LIST} component={NativeGalleriesPage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
            </SiteContainer>
        </div>
    </Router>  
);

export default withAuthentication(App);