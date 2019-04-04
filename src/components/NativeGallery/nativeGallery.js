import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import NativeCard from './nativeCard';

const INITIAL_STATE = {
    loading: false,
    existing: false,
    uid: null,
    cardCount: 0,
    editMode: false,
    projectName: 'Project Name',
    editProjectName: 'Project Name',
    nativeCards: [],
    limit: 5,
    error: null,
    edited: false,
    userId: null,
}

class NativeGalleryBase extends Component {
    constructor(props) {
        super(props);
        if (props.nativeGallery){ console.log(props.nativeGallery)};
        this.state = (props.nativeGallery) ? ({
            loading: false,
            existing: true,
            uid: props.nativeGallery.uid,
            cardCount: props.nativeGallery.nativeCards.length,
            editMode: false,
            projectName: props.nativeGallery.projectName,
            nativeCards: props.nativeGallery.nativeCards,
            limit: 5,
            error: null,
            edited: false,
            userId: props.nativeGallery.userId
        }) : ({...INITIAL_STATE});
    }
    componentDidMount() {
        // this.setState({ loading: true });
        // this.props.firebase
        //     .nativeGallery(this.props.match.params.id)
        //     .on('value', snapshot => {
            // const nativeGallery = snapshot.val();
        //         this.setState({ 
                        // existing: true,
                        // uid: nativeGallery.uid,
                        // cardCount: nativeGallery.nativeCards.length,
                        // editMode: false,
                        // projectName: nativeGallery.projectName,
                        // nativeCards: nativeGallery.nativeCards,
                        // limit: 5,
                        // error: null,
                        // edited: false
        //             loading: false
        //         });
        //     });
    }

    componentWillUnmount() {

    }

    // Called when creating a new Native Gallery
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

    // Called when updating an existing Native Gallery
    onUpdatePublished = (e, authUser) => {
        this.setState({ loading: true });
        const { uid, projectName, cardCount, nativeCards } = this.state;
        this.props.firebase.nativeGallery(uid).update({
            projectName,
            cardCount,
            nativeCards,
            modifiedAt: this.props.firebase.serverValue.TIMESTAMP 
        }).then(() => {
            this.setState({ loading: false })
            this.props.history.push(ROUTES.NATIVEGALLERY_LIST);
        }).catch(error => {
            this.setState({ error, loading: false });
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

            return { nativeCards, edited: true };
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
            editMode: false,
            edited: true
        }));
    }

    render() {
        const { cardCount, limit, nativeCards, edited, error, existing, loading, userId } = this.state;
        const { editMode, editProjectName, projectName } = this.state;
        const decrementInvalid = cardCount <= 0;
        const incrementInvalid = cardCount >= limit;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        { (!loading) ? (
                            <div>
                            { (!existing || authUser.uid === userId || authUser.roles.includes(ROLES.ADMIN)) ? (
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
                                            canEdit={true}
                                        />
                                    ))}
                                    {cardCount > 0 && edited && !existing && (
                                        <button 
                                            type="button" 
                                            onClick={e => this.onPublish(e, authUser)}
                                        >Publish</button>
                                    )}
                                    {cardCount > 0 && edited && existing && (
                                        <button 
                                            type="button" 
                                            onClick={e => this.onUpdatePublished(e, authUser)}
                                        >Update Project</button>
                                    )}
                                    {error && <div>{error}</div>}
                                </div>
                            ) : (
                                <div>
                                    Number of Cards: {cardCount}
                                    <div>
                                        {projectName}
                                    </div>
                                    {nativeCards.map((nativeCard, i) => (
                                        <NativeCard 
                                            key={i} 
                                            cardData={nativeCard}
                                            onUpdateCard={this.onUpdateCard} 
                                            canEdit={false}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        ) : (
                            <div>Loading ...</div>
                        )}
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