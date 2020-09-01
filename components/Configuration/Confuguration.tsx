import { useRecoilState, useRecoilValue } from 'recoil';
import { applicationState } from '../../state/applicationState';
import { fileUploadState } from '../../state/fileUpload.state';
import { markupDialogState } from '../../state/markupDialog.state';
import { readFiles } from '../Dropzone/Filereader.helper';
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Configuration.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import CategoryIcon from '@material-ui/icons/Category';
import MarkupDialog from '../MarkupDialog/MarkupDialog';

const Configuration = () => {
  const fileUpload = useRecoilValue(fileUploadState);
  const [app, setApp] = useRecoilState(applicationState);
  const [parameters, setParameters] = React.useState({
    trim: false,
    strip: false
  });
  const [markupDialog, setMarkupDialog] = useRecoilState(markupDialogState);
  const params = `?trim=${parameters.trim}&strip=${parameters.strip}`;

  const reset = () => {
    setParameters({ trim: false, strip: false });
  }

  const upload = async () => {
    const textFiles = await readFiles(fileUpload);

    const options = {
      method: 'POST',
      body: JSON.stringify(textFiles),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    setApp({ error: false, loading: true });

    fetch('/api/upload' + params, options).then((response) => {
      console.log('fetch with options =>', options);

      if (response.status === 200) {
        return response.json();
      } else {
        setApp({ error: true, loading: false });
      }
    }).catch((e) => {
      console.warn('SVG generation failed', e);
      setApp({ error: true, loading: false });
    }).then((response: { svgSymbol: string, amount: number }) => {
      setApp({ error: false, loading: false });

      if (response) {
        console.log('Success =>', response);
        setMarkupDialog({ open: true, markup: response.svgSymbol, amount: response.amount });
      }
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, [event.target.name]: event.target.checked });
  };

  const handleDialogClose = () => {
    setMarkupDialog({ ...markupDialog, open: false });
  };

  return (
    <div className={styles.configuration}>
      <FormControl component="fieldset" className={styles.configurationForm}>
        <FormLabel component="legend">Generation options</FormLabel>
        <FormGroup>
          <div>
            <FormControlLabel
              control={<Checkbox checked={parameters.trim} onChange={handleChange} name="trim"/>}
              label="Remove whitespaces"
            />
            <Tooltip title={'Removes tabs, spaces and line breaks in order to save file size'}>
              <IconButton>
                <InfoIcon/>
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox checked={parameters.strip} onChange={handleChange} name="strip"/>}
              label="Strip fill and stroke"
            />
            <Tooltip title={'Removes the fill and stroke attributes from each icon. This makes the sprite lose its colors and lets you style it via CSS'}>
              <IconButton>
                <InfoIcon/>
              </IconButton>
            </Tooltip>
          </div>
        </FormGroup>
        <FormGroup>
          <div className={styles.configurationUploadBtn}>
            <Button
                variant="contained"
                color="secondary"
                onClick={upload}
                disabled={fileUpload.length < 2 || app.loading}
                startIcon={<CategoryIcon/>}
                className={styles.buttonUpload}
              >
              <span>Generate ({fileUpload.length})</span>
              {app.loading && <CircularProgress size={24} className={styles.buttonProgress}/>}
            </Button>
            <FormHelperText>
              Reapply after any change
            </FormHelperText>
          </div>
          <Button
              variant="outlined"
              color="primary"
              onClick={reset}
              disabled={!parameters.trim && !parameters.strip}
            >
              Reset
          </Button>
        </FormGroup>
      </FormControl>

      <MarkupDialog
        markup={markupDialog.markup}
        amount={markupDialog.amount}
        oncloseFn={handleDialogClose}
        open={markupDialog.open} />
    </div>
  );
}

export default Configuration;
