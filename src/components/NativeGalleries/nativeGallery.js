import React, { Component } from 'react';

// import { AuthUserContext } from '../Session';
// import { withFirebase } from '../Firebase';

import NativeCard from './nativeCard';

// class NativeGalleryBase extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             users: null,
//             cardObj: null,
//             loading: false,
//             nativeCards: [],
//             limit: 5,
//             endOfNativeCardsReached: false,
//         }
//     }

//     componentDidMount() {
//         this.onListenForUsers();
//         this.onListenForNativeCard();
//     }

//     componentWillUnmount() {
//         this.props.firebase.nativeGallery().off();
//         this.props.firebase.users().off();
//     }

//     onListenForUsers() {
//         this.props.firebase
//             .users()
//             .on('value', snapshot => {
//                 this.setState({
//                     users: snapshot.val()
//                 });
//             });
//     }

//     onListenForNativeCard() {
//         this.setState({ loading: true });
//         const oldNativeCardsLength = this.state.nativeCards.length;
//         this.props.firebase
//             .nativeGallery()
//             .orderByChild('createdAt')
//             .limitToLast(this.state.limit)
//             .on('value', snapshot => {
//                 const nativeCardsObject = snapshot.val();

//                 if (nativeCardsObject) {
//                     const nativeCardsList = Object.keys(nativeCardsObject).map(key => ({
//                         ...nativeCardsObject[key],
//                         uid: key
//                     }));

//                     const endOfNativeCardsReached = (oldNativeCardsLength === nativeCardsList.length || nativeCardsList.length < this.state.limit)
                    
//                     this.setState({ 
//                         nativeCards: nativeCardsList, 
//                         loading: false,
//                         endOfNativeCardsReached
//                     });   
//                 } else {
//                     this.setState({ nativeCards: null, loading: false});
//                 }
//             })
//     }

//     onNextPage = () => {
//         this.setState(state => ({limit: state.limit + 5}), this.onListenForNativeGalleries);
//     }


//     onChangeText = e => {
//         this.setState({ text: e.target.value})
//     }

//     onCreateNativeCard = (e, authUser) => {
//         this.props.firebase.nativeGallery().push({
//             cardObj: this.state.cardObj,
//             userId: authUser.uid,
//             createdAt: this.props.firebase.serverValue.TIMESTAMP,
//             modified: false,
//             modifiedAt: null
//         });

//         this.setState({ cardObj: null });

//         e.preventDefault();
//     }

//     onRemoveCard = uid => {
//         this.props.firebase.nativeGallery(uid).remove();
//     }

//     onEditCard = (nativeCard, text) => {
//         this.props.firebase.nativeGallery(nativeCard.uid).set({
//             ...nativeCard,
//             text,
//             modified: true,
//             dateModified: this.props.firebase.serverValue.TIMESTAMP
//         })
//     }

//     render() {
//         const { users, cardObj, nativeCards, loading, endOfNativeCardsReached } = this.state;
//         return (
//             <AuthUserContext.Consumer>
//                 {authUser => (
//                     <div>
//                         {loading && <div>Loading...</div>}
//                         {!loading && nativeCards && !endOfNativeCardsReached && (
//                             <button type="button" onClick={this.onNextPage}>
//                                 More
//                             </button>
//                         )}
//                         {nativeCards && (
//                             <NativeCardList 
//                                 nativeCards={nativeCards.map(nativeCard => ({
//                                     ...nativeCard,
//                                     user: users
//                                       ? users[nativeCard.userId]
//                                       : { userId: nativeCard.userId },
//                                   }))}
//                                 onEditMessage={this.onEditMessage}
//                                 onRemoveMessage={this.onRemoveMessage} 
//                             />
//                         )}
//                         {!messages && <div>There are no messages...</div>}
//                         <form onSubmit={e => this.onCreateMessage(e, authUser)}>
//                             <input 
//                                 type="text"
//                                 value={text}
//                                 onChange={this.onChangeText}
//                             />
//                             <button type="submit">Send</button>
//                         </form>
//                     </div>
//                 )}
//             </AuthUserContext.Consumer>
//         ); 
//     }
// }

// const MessageList = ({ messages, onRemoveMessage, onEditMessage }) => (
//     <ul>
//         {messages.map(message => (
//             <MessageItem 
//                 key={message.uid}
//                 message={message} 
//                 onEditMessage={onEditMessage}
//                 onRemoveMessage={onRemoveMessage}
//             />
//         ))}
//     </ul>
// );

// export default withFirebase(MessagesBase);
// const testData = [
//     {
//         headline: 'Headline 1',
//         productName: 'Product 1',
//         productDescription: 'Product 1 Description',
//         price: '$9.99',
//     },
//     {
//         headline: 'Headline 2',
//         productName: 'Product 2',
//         productDescription: 'Product 2 Description',
//         price: '$7.99',
//     },
//     {
//         headline: 'Headline 3',
//         productName: 'Product 3',
//         productDescription: 'Product 3 Description',
//         price: '$8.99',
//     },
// ]

class NativeGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardCount: 0,
            editMode: false,
            projectName: 'Project Name',
            editProjectName: 'Project Name',
            nativeCards: [],
            limit: 5,
        };
    }
    onIncrementCardCount = () => {
        this.setState(state => {
            const newCardNum = state.nativeCards.length + 1;
            const newCard = {
                cardNumber: `${newCardNum}`,
                headline: `Headline ${newCardNum}`,
                productName: `Product ${newCardNum}`,
                productDescription: `Product ${newCardNum} Description`,
                price: `$0.00`,

            }
            const nativeCards = [...state.nativeCards, newCard];
            const cardCount = state.cardCount + 1;
            return { cardCount, nativeCards };
        });
    }

    onDecrementCardCount = () => {
        this.setState(state => {
            const nativeCards = state.nativeCards.slice(0, -1);
            const cardCount = state.cardCount - 1;
            return { cardCount, nativeCards };
        });
    }

    onUpdateCard = (updatedNativeCard) => {
        const index = updatedNativeCard.cardNumber - 1;
        this.setState(state => {
            console.log({index, updatedNativeCard, nativeCard: state.nativeCards[index]})
            const nativeCards = state.nativeCards.map((nativeCard, i) => (
                index === i ? updatedNativeCard : nativeCard
            ));

            return { nativeCards };
        });
    }

    onChangeText = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
        }));
    }

    onSaveEditText = () => {
        this.setState(state => ({
            projectName: state.editProjectName,
            editMode: false
        }));
    }

    render() {
        const { cardCount, limit, nativeCards } = this.state;
        const { editMode, editProjectName, projectName } = this.state;
        const decrementInvalid = cardCount <= 0;
        const incrementInvalid = cardCount >= limit;
        return (
            <div>
                Number of cards: 
                <button 
                    type="button"
                    disabled={decrementInvalid} 
                    onClick={() => this.onDecrementCardCount()}
                > - </button>
                {cardCount}
                <button 
                    type="button"
                    disabled={incrementInvalid} 
                    onClick={() => this.onIncrementCardCount()}
                > + </button>

                <div>
                {editMode ? (
                    <input
                        type="text"
                        name="editProjectName"
                        value={editProjectName}
                        onChange={this.onChangeText}
                        placeholder="Project Name"
                    />
                ) : (
                    <span>{projectName}</span>
                )}
                {editMode ? (
                    <div>
                        <button onClick={() => this.onSaveEditText()}>Save</button>
                        <button onClick={this.onToggleEditMode}>Reset</button>
                    </div>
                ) : (
                    <button onClick={this.onToggleEditMode}>Edit</button>
                )}
                </div>
                {nativeCards.map((nativeCard, i) => (
                    <NativeCard 
                        key={i} 
                        cardData={nativeCard}
                        onUpdateCard={this.onUpdateCard} 
                    />
                ))}
            </div>
        );
    }
}

export default NativeGallery;