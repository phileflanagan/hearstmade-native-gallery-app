import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';

import LandingPage from '../Landing';
import SingUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import NativeGalleriesPage from '../NativeGalleries';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import '../FontAwesome';
import styled from 'styled-components';
import { SiteContainer } from '../Generic';

const App = () => (
	<Router>
		<SiteWrapper>
			<Navigation />
			<SiteContainer padding paddingFooter>
				<Switch>
					<Route exact path={ROUTES.LANDING} component={LandingPage} />
					<Route path={ROUTES.SIGN_UP} component={SingUpPage} />
					<Route path={ROUTES.SIGN_IN} component={SignInPage} />
					<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
					<Route path={ROUTES.HOME} component={HomePage} />
					<Route
						path={ROUTES.NATIVEGALLERY_LIST}
						component={NativeGalleriesPage}
					/>
					<Route path={ROUTES.ACCOUNT} component={AccountPage} />
					<Route path={ROUTES.ADMIN} component={AdminPage} />
				</Switch>
			</SiteContainer>
			<Footer />
		</SiteWrapper>
	</Router>
);

export default withAuthentication(App);

// *** STYLED COMPONENTS ***

const SiteWrapper = styled.div`
	min-height: 100vh;
	position: relative;
`;
