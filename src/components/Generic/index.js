import React, { Component } from 'react';
import styled from 'styled-components';

export const SiteContainer = styled.div`
    display: ${props => props.flex ? 'flex' : 'block'};
    position: relative;
    margin: 0 auto;
    max-width: 1100px;
    min-width: 100%;
`

export const Button = styled.button`
    padding: 1rem;
    color: red;
`