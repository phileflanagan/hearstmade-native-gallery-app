import React, { Component } from 'react';
import styled from 'styled-components';

export const SiteContainer = styled.div`
    display: ${props => props.flex ? 'flex' : 'block'}
    position: relative;
    margin: 0 auto;
    max-width: 1100px;
    padding:${props => props.padding ? '1rem': '0'}
`

export const Button = styled.button`
    display: inline-block;
    padding: 0 1rem;
    color: white;
    outline: none;
    height: 40px;
    border: none;
    background-color: #e7bd57;
`

export const Input = styled.input`
    display: block;
    padding: 0.5rem;
    outline: none;
    background-color: #888;
    border: none;
    height: 40px;
    color: white;
    width: ${props => props.width100 ? '100%' : null};
    &::placeholder {
        color: #ccc;
    }
`

export const Center = styled.div`
    text-align: center;
    margin: 0 auto;
`

export const AccountForm = styled.form`
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`