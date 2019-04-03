import React, { Component } from 'react';

// import { AuthUserContext } from '../Session';
// import * as ROLES from '../../constants/roles';

/* Props 
    key={message.uid}
    message={message} 
    onEditMessage={onEditMessage}
    onRemoveMessage={onRemoveMessage}
*/

/* Fn
    onRemoveMessage(uid)
    onEditMessage(message, text)
*/

// class NativeCard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             editMode: false,
//             editText: this.props.message.text
//         }
//     }

//     onToggleEditMode = () => {
//         this.setState(state => ({
//             editMode: !state.editMode,
//             editText: this.props.message.text
//         }));
//     }

//     onChangeEditText = e => {
//         this.setState({ editText: e.target.value });
//     }

//     onSaveEditText = () => {
//         this.props.onEditMessage(this.props.message, this.state.editText);
//         this.setState({ editMode: false })
//     }

//     render() {
//         const { message, onRemoveMessage } = this.props;
//         const { editMode, editText } = this.state;
//         return (
//             <AuthUserContext.Consumer>
//                 {authUser => (
//                     <li>
//                         {editMode ? (
//                             <input
//                                 type="text"
//                                 value={editText}
//                                 onChange={this.onChangeEditText}
//                             />
//                         ) : (
//                             <span>
//                                 <strong>{message.user.username || message.user.userId}</strong> {message.text}
//                                 {message.modified && <small> (edited)</small>}
//                             </span>
//                         )}
//                         {(authUser.uid === message.userId || authUser.roles.includes(ROLES.ADMIN)) && (
//                             <span>
//                                 {editMode ? (
//                                     <span>
//                                         <button onClick={this.onSaveEditText}>Save</button>
//                                         <button onClick={this.onToggleEditMode}>Reset</button>
//                                     </span>
//                                 ) : (
//                                     <button onClick={this.onToggleEditMode}>Edit</button>
//                                 )}
//                                 {!editMode && (
//                                     <button type="button" onClick={() => onRemoveMessage(message.uid)}>Delete</button>
//                                 )}
//                             </span>
//                         )}
//                     </li>
//                 )}
//             </AuthUserContext.Consumer>
//         );
//     }
// }

// const INITIAL_STATE = {
//     editMode: false,
//     cardNumber: 1,
//     headline: 'Headline',
//     editHeadline: this.props.nativeCard.headline,
//     productName: 'Product Name',
//     editProductName: this.props.nativeCard.productName,
//     productDescription: 'Product Description',
//     editProductDecription: this.props.nativeCard.productDescription,
//     price: '$0.00',
//     editPrice: this.props.nativeCard.editPrice,
//     limit: 5
// }

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
        return (
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
        );
    }
}
export default NativeCard;