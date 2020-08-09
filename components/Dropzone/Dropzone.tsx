import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import styles from './Dropzone.module.scss';
import Tooltip from '@material-ui/core/Tooltip';
import MarkupDialog from '../MarkupDialog/MarkupDialog';

const Dropzone = () => {
  const [fileObjects, setFileObjects] = useState([]);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [markup, setMarkup] = useState('');

  const handleChange = (newFileObjs: File[]) => {
    console.log('setFileObjects =>', newFileObjs);
    setFileObjects(newFileObjs);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const upload = () => {
    const formData = new FormData();

    fileObjects.forEach((file) => {
      console.log('Append file', file.name);
      formData.append('file', file);
    });

    const options = {
      method: 'POST',
      body: formData,
      contentType: 'multipart/form-data'
    };

    console.log('fetchig...', options);

    fetch('/api/upload', options).then((response) => {
      return response.json();
    }).catch((e) => {
      console.warn('SVG generation did not complete, possible server side error', e);
      setError(true);
    }).then((response: { svgSymbol: string }) => {
      if (response) {
        console.log('Success =>', response);
        setMarkup(response.svgSymbol);
        setDialogOpen(true);
      }
    });
  }

  return (
    <div className={styles.dropzone}>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message="Sorry, SVG Sprite generation failed on server side :-("
      />

      <MarkupDialog markup={markup} oncloseFn={handleDialogClose} open={dialogOpen} />

      <DropzoneArea
        onChange={handleChange}
        dropzoneClass={'dropzone'}
        acceptedFiles={['image/svg+xml']}
        dropzoneText={'Drop your SVG icons here'}
        maxFileSize={5000000}
        filesLimit={1000}
        showFileNames={true}
        useChipsForPreview={false}
      />
      <div className={styles.uploadControls}>
        <Button variant="contained" color="secondary" onClick={upload} disabled={fileObjects.length < 2}>
          Transform ({fileObjects.length})
        </Button>
        <Tooltip title={'You must at least drop 2 SVG files in order to generate a SVG sprite'}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Dropzone;
