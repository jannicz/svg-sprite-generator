import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { applicationState } from '../../state/applicationState';
import { fileUploadState } from '../../state/fileUpload.state';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './Dropzone.module.scss';

const Dropzone = () => {
  const app = useRecoilValue(applicationState);
  const setFileUpload = useSetRecoilState(fileUploadState);

  const handleChange = (newFileObjs: File[]) => {
    console.log('fileUpload =>', newFileObjs);
    setFileUpload(newFileObjs);
  };

  return (
    <div className={styles.dropzone}>
      <Snackbar
        open={app.error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message="Sorry, SVG Sprite generation failed on server side :-("
      />

      <DropzoneArea
        onChange={handleChange}
        dropzoneClass={'dropzone'}
        acceptedFiles={['image/svg+xml']}
        dropzoneText={'Drop your SVG icons here'}
        maxFileSize={5000000}
        filesLimit={1000}
        showFileNames={true}
        useChipsForPreview={false}
        showAlerts={['error', 'info']}
        previewGridClasses={{ item: styles.customItem }}
      />
    </div>
  );
}

export default Dropzone;
