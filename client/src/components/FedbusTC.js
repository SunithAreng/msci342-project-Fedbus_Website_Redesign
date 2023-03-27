import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";

export const FedbusTC = ({ open, handleClose }) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Fedbus Terms and Conditions:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        1. Eating is not permitted on the bus. <br />
                        2. No refunds on ticket purchases. <br />
                        3. Please arrive 15 minutes prior to your departure time. <br />
                        4. You must show your Watcard upon boarding. <br />
                        5. Luggage is limited to what you can fit under your seat or on your lap. <br />
                        6. Although Masks are not required, they are still recommended when travelling Fed Bus.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus>
                        I understand and I agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}