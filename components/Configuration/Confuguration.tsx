import { Typography } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { applicationState } from '../../state/applicationState';
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Configuration.module.scss';

const Configuration = () => {
  const [state, setState] = React.useState({
    trim: false,
    strip: false
  });

  // const appState = useRecoilValue(appState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('set event.target =>', [event.target.name], event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { trim, strip } = state;

  return (
    <div className={styles.configuration}>
      <Typography variant="h5" component="h2">
        Options
      </Typography>
      <FormControl component="fieldset" className={styles.configurationForm}>
        <FormLabel component="legend">Chose optional parameters</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={trim} onChange={handleChange} name="trim" />}
            label="Remove whitespaces"
          />
          <FormControlLabel
            control={<Checkbox checked={strip} onChange={handleChange} name="strip" />}
            label="Strip fill and stroke properties"
          />
        </FormGroup>
        <FormGroup>
          <Button variant="text" color="primary">
            Reset files
          </Button>
        </FormGroup>
        <FormHelperText>Something</FormHelperText>
      </FormControl>
    </div>
  );
}

export default Configuration;
