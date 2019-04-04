import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';

class NativeCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editMode: false,
            editHeadline: this.props.cardData.headline,
            editProductName: this.props.cardData.productName,
            editProductDescription: this.props.cardData.productDescription,
            editPrice: this.props.cardData.price,
         };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
        }));
    }

    onSaveEditText = (cardNumber) => {
        this.props.onUpdateCard({ 
            cardNumber,
            headline: this.state.editHeadline,
            productName: this.state.editProductName,
            productDescription: this.state.editProductDescription,
            price: this.state.editPrice, 
        });
        this.setState({ editMode: false });
    }

    onChangeText = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { cardNumber, headline, productName, productDescription, price } = this.props.cardData;
        const { editMode, editHeadline, editProductName, editProductDescription, editPrice } = this.state;
        const { canEdit } = this.props;
        return (
            <div>
                {(canEdit) ? (
                    <div>
                        Card {cardNumber}
                        {editMode ? (
                            <div>
                                <label htmlFor="editHeadline">Headline</label>
                                <input
                                    type="text"
                                    name="editHeadline"
                                    onChange={this.onChangeText}
                                    value={editHeadline}
                                    id="editHeadline"
                                    placeholder="Headline"
                                />
                                <label htmlFor="editProductName">Product Name</label>
                                <input
                                    type="text"
                                    name="editProductName"
                                    onChange={this.onChangeText}
                                    value={editProductName}
                                    id="editProductName"
                                    placeholder="Product Name"
                                /> 
                                <label htmlFor="editProductDescription">Description</label>
                                <textarea
                                    type="text"
                                    name="editProductDescription"
                                    onChange={this.onChangeText}
                                    value={editProductDescription}
                                    id="editProductDescription"
                                    placeholder="Product Description"
                                ></textarea>
                                <label htmlFor="editPrice">Price</label>
                                <input
                                    type="text"
                                    name="editPrice"
                                    onChange={this.onChangeText}
                                    value={editPrice}
                                    id="editPrice"
                                    placeholder="Price, e.g. '$0.00"
                                />      
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

// <AuthUserContext.Consumer>
// {authUser => ((canEdit) ? (
//     <div>
//         Card {cardNumber}
//         {editMode ? (
//             <div>
//                 <label htmlFor="editHeadline">Headline</label>
//                 <input
//                     type="text"
//                     name="editHeadline"
//                     onChange={this.onChangeText}
//                     value={editHeadline}
//                     id="editHeadline"
//                     placeholder="Headline"
//                 />
//                 <label htmlFor="editProductName">Product Name</label>
//                 <input
//                     type="text"
//                     name="editProductName"
//                     onChange={this.onChangeText}
//                     value={editProductName}
//                     id="editProductName"
//                     placeholder="Product Name"
//                 /> 
//                 <label htmlFor="editProductDescription">Description</label>
//                 <textarea
//                     type="text"
//                     name="editProductDescription"
//                     onChange={this.onChangeText}
//                     value={editProductDescription}
//                     id="editProductDescription"
//                     placeholder="Product Description"
//                 ></textarea>
//                 <label htmlFor="editPrice">Price</label>
//                 <input
//                     type="text"
//                     name="editPrice"
//                     onChange={this.onChangeText}
//                     value={editPrice}
//                     id="editPrice"
//                     placeholder="Price, e.g. '$0.00"
//                 />      
//             </div>
//         ) : (
//             <div>
//                 <h2>{headline}</h2>
//                 <h3>{productName}</h3>
//                 <p>{productDescription}</p>
//                 <p>{price}</p>
//             </div>
//         )}

//         {editMode ? (
//             <div>
//                 <button onClick={() => this.onSaveEditText(cardNumber)}>Save</button>
//                 <button onClick={this.onToggleEditMode}>Reset</button>
//             </div>
//         ) : (
//             <button onClick={this.onToggleEditMode}>Edit</button>
//         )}
//         <hr />
//     </div>
// ) : (
//     <div>
//         <h2>{headline}</h2>
//         <h3>{productName}</h3>
//         <p>{productDescription}</p>
//         <p>{price}</p>
//     </div>
// ))};
// </AuthUserContext.Consumer>