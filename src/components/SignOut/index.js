import React from 'react';

import { withFirebase } from '../Firebase';

import { Button } from '../Generic';

const SignOutButton = ({ firebase }) => (
    <div onClick={firebase.doSignOut}>
        Sign Out
    </div>
);

export default withFirebase(SignOutButton);