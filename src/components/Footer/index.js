import React from 'react';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SiteContainer } from '../Generic';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    const copyrightYear =  (2019 === year) ? '2019' : `2019 - ${year}`;
    return (
        <FooterBarWrapper>
            <SiteContainer padding>
                <FooterBar>
                    <span>&copy; {copyrightYear} Hearstmade</span>
                    <span>Made with <FontAwesomeIcon icon="heart" fixedWidth /> by Phil Flanagan</span>
                </FooterBar>
            </SiteContainer>
        </FooterBarWrapper>
    );
}

export default Footer;

// *** STYLED COMPONENTS ***

const FooterBarWrapper = styled.div`
    position: absolute;
    bottom: 0;
    background-color: #333;
    color: #666;
    width: 100%;
    height: 40px;
`

const FooterBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.7rem;
`