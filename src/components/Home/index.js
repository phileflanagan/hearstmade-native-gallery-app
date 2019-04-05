import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import styled from 'styled-components';
import { LargeHeading, SubtleText } from '../Generic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = () => (
    <Splash>
        <LargeHeading><FontAwesomeIcon icon="eye" /></LargeHeading>
        <LargeHeading>Welcome</LargeHeading>
        <SubtleText>Hearstmade Tools: A new experience</SubtleText>
    </Splash>
);
    
const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(HomePage)


// *** STYLED COMPONENTS ***

const Splash = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 50vh;
    background-color: salmon;
`