import React from 'react';
import Button from '@material-ui/core/Button';
import history from '../../Navigation/history';

const Admin = (props) => {
    const adminConfirm = props.location.state.stuff[0];

    return (
        <div>
            <Button key='4'
                onClick={() => history.push('/MyProfile')}
                variant="contained" color="primary"
                sx={{ my: 2, display: 'block' }}>Go Back</Button>
            <h1>Hello World!</h1>
            <p>Welcome to the Admin page.</p>
        </div>
    );
}

export default Admin;
