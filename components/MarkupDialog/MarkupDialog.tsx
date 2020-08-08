import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

type Props = {
  open: boolean
  markup: string
  oncloseFn: () => void
}

const MarkupDialog = ({ open, markup, oncloseFn }: Props) => {
  return (
    <Dialog aria-labelledby="simple-dialog-title"
            open={open}
            fullWidth={true}
            maxWidth={'lg'}>
      <DialogTitle id="simple-dialog-title">Your SVG sprite markup</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This file contains all your uploaded SVGs concatenated as symbols.
        </DialogContentText>
        <TextField
          id="markup-content"
          multiline={true}
          label="SVG file"
          variant="outlined"
          style={{ width: '100%', minHeight: '200px' }}
          defaultValue={markup}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={oncloseFn}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MarkupDialog;
