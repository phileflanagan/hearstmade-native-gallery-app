import React, { Component } from 'react';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonSubtle, ButtonGroup, Label, Counter } from '../Generic';

class NativeCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editMode: false,
            editProductName: this.props.cardData.productName,
            editProductDescription: this.props.cardData.productDescription,
            editPrice: this.props.cardData.price,
         };
    }

    charLimits = {
        editProductName: 50,
        editProductDescription: 225,
        editPrice: 10
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
        }));
    }

    onSaveEditText = (cardNumber) => {
        this.props.onUpdateCard({ 
            cardNumber,
            productName: this.state.editProductName,
            productDescription: this.state.editProductDescription,
            price: this.state.editPrice, 
        });
        this.setState({ editMode: false });
    }

    onChangeText = e => {
        if (this.state.hasOwnProperty(e.target.name) && this.charLimits.hasOwnProperty(e.target.name)) {
            if (this.state[e.target.name].length >= this.charLimits[e.target.name]) {
                this.setState({ [e.target.name]: e.target.value.substring(0, this.charLimits[e.target.name]) });
            } else {
                this.setState({ [e.target.name]: e.target.value });

            }
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    render() {
        const { cardNumber, productName, productDescription, price } = this.props.cardData;
        const { editMode, editProductName, editProductDescription, editPrice } = this.state;
        const { canEdit, headline } = this.props;
        return (
            <CardWrapper>
                {(canEdit) ? (
                    <div>
                        <Label>Card {cardNumber}</Label>
                        {editMode ? (
                            <div>
                                <h2>{headline}</h2>
                                <Label htmlFor="editProductName">Product Name</Label>
                                <InfoInput
                                    type="text"
                                    name="editProductName"
                                    onChange={this.onChangeText}
                                    value={editProductName}
                                    id="editProductName"
                                    placeholder="Product Name"
                                /> 
                                <Counter>{editProductName.length} / {this.charLimits.editProductName}</Counter>
                                <Label htmlFor="editProductDescription">Description</Label>
                                <InfoTextArea
                                    rows={5}
                                    name="editProductDescription"
                                    onChange={this.onChangeText}
                                    value={editProductDescription}
                                    id="editProductDescription"
                                    placeholder="Product Description"
                                ></InfoTextArea>
                                <Counter>{editProductDescription.length} / {this.charLimits.editProductDescription}</Counter>
                                <Label htmlFor="editPrice">Price</Label>
                                <InfoInput
                                    type="text"
                                    name="editPrice"
                                    onChange={this.onChangeText}
                                    value={editPrice}
                                    id="editPrice"
                                    placeholder="Price, e.g. '$0.00"
                                />
                                <Counter>{editPrice.length} / {this.charLimits.editPrice}</Counter>   
                            </div>
                        ) : (
                            <div>
                                <h2>{headline}</h2>
                                <h3>{productName}</h3>
                                <p>{productDescription}</p>
                                <p>{price}</p>
                            </div>
                        )}

                        {editMode ? (
                            <ButtonGroup>
                                <ButtonSubtle onClick={this.onToggleEditMode}>
                                    <FontAwesomeIcon icon="undo" fixedWidth />
                                </ButtonSubtle>
                                <ButtonSubtle onClick={() => this.onSaveEditText(cardNumber)}>
                                    <FontAwesomeIcon icon="save" fixedWidth />
                                </ButtonSubtle>
                            </ButtonGroup>
                        ) : (
                            <ButtonGroup>
                                <ButtonSubtle onClick={this.onToggleEditMode}>
                                    <FontAwesomeIcon icon="pencil-alt" />
                                </ButtonSubtle>
                            </ButtonGroup>
                        )}
                    </div>
                ) : (
                    <div>
                        <h2>{headline}</h2>
                        <h3>{productName}</h3>
                        <p>{productDescription}</p>
                        <p>{price}</p>
                    </div>
                )}
            </CardWrapper>
        );
    }
}
export default NativeCard;


// *** STYLED COMPONENTS ***

const CardWrapper = styled.div`
    display: inline-block;
    max-width: 400px;
    width: 100%;
    background-color: white;
    border-radius: 0.2rem;
    color: black;
    padding: 1rem;
    margin: 0.5rem;
    text-align: left;

    @media (max-width: 700px) {
        display: block;
        max-width: 100%;
        margin: 0.5rem 0;
      }
`

const InfoInput = styled.input`
    display: inline-block;
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    background-color: transparent;
    border: 1px solid #ccc;
    outline: none;
    padding: 0.5rem;
    height: 40px;
    width: 300px;
    color: #222;
`

const InfoTextArea = styled.textarea`
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    margin: 0;
    background-color: transparent;
    border: 1px solid #ccc;
    outline: none;
    padding: 0.5rem;
    height: 40px;
    width: 300px;
    color: #222;
`