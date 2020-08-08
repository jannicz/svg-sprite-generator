import React from 'react';
import styles from './Dropzone.module.scss';
import { DropzoneArea } from 'material-ui-dropzone';

const Dropzone = () => {
  const handleChange = (e) => {
    console.log('Dropzone change', e);
  };

  return (
    <div className={styles.dropzone}>
      <DropzoneArea
        onChange={handleChange.bind(this)}
        dropzoneClass={'dropzone'}
        acceptedFiles={['image/svg+xml']}
        dropzoneText={'Drop your SVG icons here'}
        maxFileSize={5000000}
        filesLimit={1000}
        showFileNames={true}
      />
    </div>
  );
}

export default Dropzone;
