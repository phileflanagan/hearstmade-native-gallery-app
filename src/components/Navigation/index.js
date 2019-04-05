import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';

import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import styled from 'styled-components';
import { SiteContainer } from '../Generic';

const Navigation = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser => authUser 
            ? <NavigationAuth authUser={authUser} /> 
            : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
);

class NavigationAuthBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountOpen: false,
        };
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState({ accountOpen: false });
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    onAccountOpen = e => {
        this.setState(state => ({
            accountOpen: !state.accountOpen
        }));
    }

    render() {
        const { authUser } = this.props;
        const { accountOpen } = this.state;
        return (
            <NavBarWrapper>
                <SiteContainer>
                    <NavBar>
                        <Logo><StyledLink as={Link} to={ROUTES.HOME}>Hearstmade Tools</StyledLink></Logo>
                        <NavItem><StyledLink as={Link} to={ROUTES.NATIVEGALLERY_LIST}>Native Galleries</StyledLink></NavItem>
                        <NavItem right onClick={this.onAccountOpen}>
                            <StyledLink>{authUser.username}</StyledLink>
                            {accountOpen && (
                                <AccountNav>
                                    <AccountNavItem><StyledLink as={Link} to={ROUTES.ACCOUNT}>Account</StyledLink></AccountNavItem>
                                    {authUser.roles.includes(ROLES.ADMIN) && (
                                        <AccountNavItem><StyledLink as={Link} to={ROUTES.ADMIN}>Admin</StyledLink></AccountNavItem>
                                    )}
                                    <AccountNavItem><StyledLink><SignOutButton /></StyledLink></AccountNavItem>
                                </AccountNav>
                            )}
                        </NavItem>
                    </NavBar>
                </SiteContainer>
            </NavBarWrapper>
        );
    }
}

const NavigationNonAuth = () => (
    <NavBarWrapper>
        <SiteContainer>
            <NavBar>
                <Logo><StyledLink as={Link} to={ROUTES.LANDING}>Hearstmade Tools</StyledLink></Logo>
                <NavItem right><StyledLink as={Link}to={ROUTES.SIGN_IN}>Sign In</StyledLink></NavItem>
            </NavBar>
        </SiteContainer>
    </NavBarWrapper>
);

const NavigationAuth = withRouter(NavigationAuthBase)

export default Navigation;



// *** STYLED COMPONENTS ***

const NavBarWrapper = styled.div`
    background-color: #6e9ee5;
`

const NavBar = styled.ul`
    -webkit-user-select: none;       
    -moz-user-select: none;
    -ms-user-select: none; 
    user-select: none; 
    display: block;
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    background-color: #6e9ee5;
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: center;
`
const Logo = styled.li`
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 700;
`

const NavItem = styled.li`
    cursor: pointer;
    padding: 0; 
    height: 100%;
    position: relative;
    margin-left: ${props => props.right ? 'auto' : null};
`

const StyledLink = styled.a`
    display: block;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    height: 50px;
    color: white;
    text-decoration: none;

    &:hover {
        background-color: rgba(255,255,255,0.3);
    }
`

const AccountNav = styled.ul`
    position: absolute;
    top: 100%;
    right: 0;
    width: 200px;
    display: flex;
    list-style: none;
    background-color: #666;
    padding: 0;
    margin: 0;
    flex-direction: column;
    z-index: 5;
`

const AccountNavItem = styled.li`
    margin: 0;
    display: block;
`