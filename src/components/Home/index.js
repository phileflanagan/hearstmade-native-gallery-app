import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import styled from 'styled-components';
import { LargeHeading, SubtleText } from '../Generic';

const HomePage = () => (
    <Splash>
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
    width: 100vw;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`