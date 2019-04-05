import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import NativeCard from './nativeCard';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonSubtle , ButtonClear, ButtonGroup, Label, Counter} from '../Generic';

const INITIAL_STATE = {
    loading: false,
    existing: false,
    uid: null,
    cardCount: 0,
    editMode: false,
    projectName: 'Project Name',
    editProjectName: 'Project Name',
    headline: 'Headline',
    editHeadline: 'Headline',
    nativeCards: [],
    limit: 5,
    error: null,
    edited: false,
    userId: null,
}

class NativeGalleryBase extends Component {
    constructor(props) {
        super(props);
        this.state = (props.nativeGallery) ? ({
            loading: false,
            existing: true,
            uid: props.nativeGallery.uid,
            cardCount: props.nativeGallery.nativeCards.length,
            editMode: false,
            projectName: props.nativeGallery.projectName,
            editProjectName: props.nativeGallery.projectName,
            headline: props.nativeGallery.headline,
            editHeadline: props.nativeGallery.headline,
            nativeCards: props.nativeGallery.nativeCards,
            limit: 5,
            error: null,
            edited: false,
            userId: props.nativeGallery.userId
        }) : ({...INITIAL_STATE});
    }

    charLimits = {
        editHeadline: 50,
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
                        // editProjectName: nativeGallery.projectName,
                        // headline: nativeGallery.headline,
                        // editHeadline: nativeGallery.headline
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
        const { projectName, headline, cardCount, nativeCards } = this.state;
        this.props.firebase.nativeGalleries().push({
            projectName,
            headline,
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
        const { uid, projectName, headline, cardCount, nativeCards } = this.state;
        this.props.firebase.nativeGallery(uid).update({
            projectName,
            headline,
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

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
        }));
    }

    onSaveEditText = () => {
        this.setState(state => ({
            projectName: state.editProjectName,
            headline: state.editHeadline,
            editMode: false,
            edited: true
        }));
    }

    render() {
        const { cardCount, limit, nativeCards, edited, error, existing, loading, userId } = this.state;
        const { editMode, editProjectName, projectName, headline, editHeadline } = this.state;
        const decrementInvalid = cardCount <= 0;
        const incrementInvalid = cardCount >= limit;

        // TODO: Add Headline here, remove from individual cards
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        { (!loading) ? (
                            <div>
                            { (!existing || authUser.uid === userId || authUser.roles.includes(ROLES.ADMIN)) ? (
                                <div>
                                    <MainInfoGroup>
                                        <Label> Number of cards</Label>
                                        <CardCountGroup>
                                            <ButtonClear 
                                                type="button"
                                                disabled={decrementInvalid} 
                                                onClick={() => this.onDecrementCardCount()}
                                            ><FontAwesomeIcon icon="chevron-left" fixedWidth /></ButtonClear>
                                            <CardCount>{cardCount}</CardCount>
                                            <ButtonClear 
                                                type="button"
                                                disabled={incrementInvalid} 
                                                onClick={() => this.onIncrementCardCount()}
                                            ><FontAwesomeIcon icon="chevron-right" fixedWidth /></ButtonClear>
                                        </CardCountGroup>
                                        <div>
                                        {editMode ? (
                                            <div>
                                                <InfoGroup>
                                                    <Label htmlFor="projectName">Project Name</Label>
                                                    <InfoInput
                                                        type="text"
                                                        name="editProjectName"
                                                        value={editProjectName}
                                                        onChange={this.onChangeText}
                                                        placeholder="Project Name"
                                                        id="projectName"
                                                    />
                                                </InfoGroup>
                                                <InfoGroup>
                                                    <Label htmlFor="unitHeadline">Unit Headline</Label>
                                                    <InfoInput
                                                        type="text"
                                                        name="editHeadline"
                                                        value={editHeadline}
                                                        onChange={this.onChangeText}
                                                        placeholder="Headline"
                                                        id="unitHeadline"
                                                    />
                                                    <Counter marginAuto>{editHeadline.length} / {this.charLimits.editHeadline}</Counter>
                                                </InfoGroup>
                                                
                                            </div>
                                        ) : (
                                            <div>
                                                <InfoGroup>
                                                    <Label>Project Name</Label> 
                                                    <Info>{projectName}</Info>
                                                </InfoGroup>
                                                <InfoGroup>
                                                    <Label>Unit Headline</Label> 
                                                    <Info>{headline}</Info>
                                                </InfoGroup>
                                            </div>
                                        )}
                                        {editMode ? (
                                            <ButtonGroup>
                                                <ButtonSubtle onClick={this.onToggleEditMode}>
                                                    <FontAwesomeIcon icon="undo" fixedWidth />
                                                </ButtonSubtle>
                                                <ButtonSubtle onClick={() => this.onSaveEditText()}>
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
                                    </MainInfoGroup>
                                    {nativeCards.map((nativeCard, i) => (
                                        <NativeCard 
                                            key={i} 
                                            headline={headline}
                                            cardData={nativeCard}
                                            onUpdateCard={this.onUpdateCard}
                                            canEdit={true}
                                        />
                                    ))}
                                    {cardCount > 0 && edited && !existing && (
                                        <Button 
                                            type="button" 
                                            onClick={e => this.onPublish(e, authUser)}
                                        >Publish</Button>
                                    )}
                                    {cardCount > 0 && edited && existing && (
                                        <Button 
                                            type="button" 
                                            onClick={e => this.onUpdatePublished(e, authUser)}
                                        >Update Project</Button>
                                    )}
                                    {error && <div>{error}</div>}
                                </div>
                            ) : (
                                <div>
                                    <MainInfoGroup>
                                        <Label> Number of cards</Label>
                                        <CardCountGroup>
                                            <CardCount>{cardCount}</CardCount>
                                        </CardCountGroup>
                                        <InfoGroup>
                                            <Label>Project Name</Label> 
                                            <Info>{projectName}</Info>
                                        </InfoGroup>
                                        <InfoGroup>
                                            <Label>Unit Headline</Label> 
                                            <Info>{headline}</Info>
                                        </InfoGroup>
                                    </MainInfoGroup>
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



// *** STYLED COMPONENTS


const MainInfoGroup = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
    background-color: #4444;
    text-align: center;
    margin-bottom: 1rem;
`

const InfoGroup = styled.div`
    margin: 1rem auto;
`

const Info = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
`

const InfoInput = styled.input`
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    background-color: rgba(255,255,255,0.2);
    border: none;
    outline: none;
    padding: 0.5rem;
    height: 40px;
    width: 300px;
    color: white;
`

const CardCount = styled.h1`
    display: inline-block;
    height: 40px;
    margin: 0;
    margin-top: 8px;
`

const CardCountGroup = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`

