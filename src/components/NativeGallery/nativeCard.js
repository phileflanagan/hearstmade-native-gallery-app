import React, { Component } from 'react';

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
            if (this.state[e.target.name].length >= this.charLimits[e.target.name]) return;
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { cardNumber, productName, productDescription, price } = this.props.cardData;
        const { editMode, editProductName, editProductDescription, editPrice } = this.state;
        const { canEdit, headline } = this.props;
        return (
            <div>
                {(canEdit) ? (
                    <div>
                        Card {cardNumber}
                        {editMode ? (
                            <div>
                                <h2>{headline}</h2>
                                <br />
                                <label htmlFor="editProductName">Product Name</label>
                                <input
                                    type="text"
                                    name="editProductName"
                                    onChange={this.onChangeText}
                                    value={editProductName}
                                    id="editProductName"
                                    placeholder="Product Name"
                                /> 
                                {<span>{editProductName.length} / {this.charLimits.editProductName}</span>}
                                <br />
                                <label htmlFor="editProductDescription">Description</label>
                                <textarea
                                    type="text"
                                    name="editProductDescription"
                                    onChange={this.onChangeText}
                                    value={editProductDescription}
                                    id="editProductDescription"
                                    placeholder="Product Description"
                                ></textarea>
                                {<span>{editProductDescription.length} / {this.charLimits.editProductDescription}</span>}
                                <br />
                                <label htmlFor="editPrice">Price</label>
                                <input
                                    type="text"
                                    name="editPrice"
                                    onChange={this.onChangeText}
                                    value={editPrice}
                                    id="editPrice"
                                    placeholder="Price, e.g. '$0.00"
                                />
                                {<span>{editPrice.length} / {this.charLimits.editPrice}</span>}      
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
                            <div>
                                <button onClick={() => this.onSaveEditText(cardNumber)}>Save</button>
                                <button onClick={this.onToggleEditMode}>Reset</button>
                            </div>
                        ) : (
                            <button onClick={this.onToggleEditMode}>Edit</button>
                        )}
                        <hr />
                    </div>
                ) : (
                    <div>
                        <h2>{headline}</h2>
                        <h3>{productName}</h3>
                        <p>{productDescription}</p>
                        <p>{price}</p>
                    </div>
                )}
            </div>
        );
    }
}
export default NativeCard;