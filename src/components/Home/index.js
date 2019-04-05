import React from 'react';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withAuthorization, withEmailVerification } from '../Session';


import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LargeHeading, SubtleText } from '../Generic';

const HomePage = () => (
    <Splash>
        <LargeHeading>Welcome</LargeHeading>
        <SubtleText>Made with <FontAwesomeIcon icon="heart" /> by Phil</SubtleText>
    </Splash>
);
    
const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(HomePage)


// *** STYLED COMPONENTS ***

const Splash = styled.div`
    width: 100vw;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`