import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

const Page = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Name:', name);
        console.log('Email:', email);
        handleClose();
    };

    return (
        <div>
            <form>
                <TextField label="Name" value={name} onChange={handleNameChange} />
                <TextField label="Email" value={email} onChange={handleEmailChange} />
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Open Dialog
                </Button>
            </form>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField label="Name" value={name} onChange={handleNameChange} />
                        <TextField label="Email" value={email} onChange={handleEmailChange} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Page;
