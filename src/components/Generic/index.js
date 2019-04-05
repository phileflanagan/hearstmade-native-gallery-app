import React, { Component } from 'react';
import styled from 'styled-components';
import { callbackify } from 'util';

export const SiteContainer = styled.div`
    display: ${props => props.flex ? 'flex' : 'block'}
    position: relative;
    margin: 0 auto;
    max-width: 1100px;
    padding:${props => props.padding ? '1rem': '0'};
    min-height: 100%;
    padding-bottom: ${props => props.paddingFooter ? 'calc(40px + 1rem)' : null};
`

export const Button = styled.button`
    cursor: pointer;
    display: inline-block;
    padding: 0 1rem;
    color: white;
    outline: none;
    height: 40px;
    border: none;
    background-color: ${props => props.light ? '#f0cf7f' : '#e7bd57'};
`

export const Input = styled.input`
    display: ${props => props.inline ? 'inline-block' : 'block'}
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

export const FormIcon = styled.span`
    background-color: #777;
    width: 40px;
    height: 40px;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Center = styled.div`
    text-align: center;
    margin: 0 auto;
`

export const Right = styled.div`
    text-align: right;
`

export const Block = styled.div`
    display: block;
`

export const Flex = styled.div`
    display: flex;
    align-items: ${props => props.vcenter ? 'center' : null};
    justify-content: ${props => props.hcenter ? 'center' : null};
    flex-direction: ${props => props.column ? 'column' : null};
`

export const AccountForm = styled.form`
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const AccountFormBox = styled.div`
    margin: 0 auto;
    max-width: 500px;
    width: 100%;
    text-align: center;
`

export const Tooltip = styled.div`
    -webkit-user-select: none;       
    -moz-user-select: none;
    -ms-user-select: none; 
    user-select: none; 
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    padding: 0.5rem;
    font-size: 0.6rem;
    color: #888;
    background-color: #ddd;
    z-index: 4;
`

export const LargeHeading = styled.h1`
    font-size: 3rem;
`
export const SubtleText = styled.p`
    opacity: 0.5;
`