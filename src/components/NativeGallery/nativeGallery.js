import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import NativeCard from './nativeCard';

class NativeGalleryBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardCount: 0,
            editMode: false,
            projectName: 'Project Name',
            editProjectName: 'Project Name',
            nativeCards: [],
            limit: 5,
            error: null
        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onPublish = (e, authUser) => {
        const { projectName, cardCount, nativeCards } = this.state;
        this.props.firebase.nativeGalleries().push({
            projectName,
            cardCount,
            nativeCards,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
            userId: authUser.uid
        }).then(() => {
            this.props.history.push(ROUTES.NATIVEGALLERY_LIST);
        }).catch(error => {
            this.setState({ error });
        });
    }

    onListenForUsers() {
        this.props.firebase
            .users()
            .on('value', snapshot => {
                this.setState({
                    users: snapshot.val()
                });
            });
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
        const { cardCount, limit, nativeCards, error } = this.state;
        const { editMode, editProjectName, projectName } = this.state;
        const decrementInvalid = cardCount <= 0;
        const incrementInvalid = cardCount >= limit;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
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
                        {cardCount > 0 && (
                            <button 
                                type="button" 
                                onClick={e => this.onPublish(e, authUser)}
                            >Publish</button>
                        )}
                        {error && <div>{error}</div>}
                    </div>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

export default compose(
    withRouter,
    withFirebase
)(NativeGalleryBase);