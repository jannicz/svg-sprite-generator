import React from 'react';
import { readFiles } from './Filereader.helper';
import { DropzoneArea } from 'material-ui-dropzone';
import { useRecoilState } from 'recoil';
import { applicationState } from '../../state/applicationState';
import { fileUploadState } from '../../state/fileUpload.state';
import { markupDialogState } from '../../state/markupDialog.state';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MarkupDialog from '../MarkupDialog/MarkupDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Dropzone.module.scss';

const Dropzone = () => {
  const [app, setApp] = useRecoilState(applicationState);
  const [fileUpload, setFileUpload] = useRecoilState(fileUploadState);
  const [markupDialog, setMarkupDialog] = useRecoilState(markupDialogState);

  const handleChange = (newFileObjs: File[]) => {
    console.log('fileUpload =>', newFileObjs);
    setFileUpload(newFileObjs);
  };

  const handleDialogClose = () => {
    setMarkupDialog({ ...markupDialog, open: false });
  };

  const upload = async () => {
    const textFiles = await readFiles(fileUpload);

    const options = {
      method: 'POST',
      body: JSON.stringify(textFiles),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('fetching with options =>', options);

    setApp({ error: false, loading: true });

    fetch('/api/upload', options).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        setApp({ error: true, loading: false });
      }
    }).catch((e) => {
      console.warn('SVG generation failed', e);
      setApp({ error: true, loading: false });

    }).then((response: { svgSymbol: string }) => {
      setApp({ error: false, loading: false });

      if (response) {
        console.log('Success =>', response);
        setMarkupDialog({ open: true, markup: response.svgSymbol });
      }
    });
  }

  return (
    <div className={styles.dropzone}>
      <Snackbar
        open={app.error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message="Sorry, SVG Sprite generation failed on server side :-("
      />

      <MarkupDialog markup={markupDialog.markup} oncloseFn={handleDialogClose} open={markupDialog.open} />

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
      <div className={styles.uploadControls}>
        <Button
          variant="contained"
          color="secondary"
          onClick={upload}
          disabled={fileUpload.length < 2 || app.loading}
          className={styles.buttonUpload}>
            Transform ({fileUpload.length})
            {app.loading && <CircularProgress size={24} className={styles.buttonProgress} />}
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
