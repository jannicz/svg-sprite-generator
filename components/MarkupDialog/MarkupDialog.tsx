import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './MarkupDialog.module.scss';


type Props = {
  open: boolean
  markup: string
  amount: number
  oncloseFn: () => void
}

const MarkupDialog = ({ open, markup, amount, oncloseFn }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog aria-labelledby="preview-dialog"
            open={open}
            fullScreen={true}
            fullWidth={true}
            maxWidth={'lg'}>
      <DialogTitle id="preview-dialog">
        Generated SVG output
        <div className={styles.markupDialogClose}>
          <IconButton onClick={oncloseFn} className={styles.markupDialogClose}>
            <CloseIcon/>
          </IconButton>
        </div>
      </DialogTitle>

      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="Switch between markup and preview"
      >
        <Tab label="Markup" />
        <Tab label="Preview" disabled={true}/>
      </Tabs>

      <DialogContent>
        <div className={styles.markupDialogInner}>
          {value === 0 ? <>
            <DialogContentText>
              Following code contains {amount} concatenated icons that were transformed to SVG symbols
            </DialogContentText>
            <TextField
              id="markup-content"
              multiline={true}
              label="SVG file"
              variant="outlined"
              style={{ width: '100%', minHeight: '50vh' }}
              defaultValue={markup}
            /></> :
            <div
              style={{ padding: '30px 20px', fill: 'black', stroke: 'black', color: 'currentcolor' }}
              dangerouslySetInnerHTML={{ __html: markup }}
            ></div>
          }
          {/*<svg-icon src='api/foo#bar' width="50px"></svg-icon>*/}
        </div>
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
