import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import styles from './Dropzone.module.scss';
import Tooltip from '@material-ui/core/Tooltip';

const Dropzone = () => {
  const [fileObjects, setFileObjects] = useState([]);

  const handleChange = (newFileObjs: File[]) => {
    setFileObjects(newFileObjs);
  };

  const upload = () => {
    const formData = new FormData();

    fileObjects.forEach((file) => {
      console.log('appending', file.name);
      formData.append('file', file);
    });

    const options = {
      method: 'POST',
      body: formData
    };

    fetch('/api/upload', options).then((e) => {
      console.log('FETCH POST SUCCESS', e);
    }).catch((e) => {
      console.log('FETCH FAILED');
    });
  }

  return (
    <div className={styles.dropzone}>
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
