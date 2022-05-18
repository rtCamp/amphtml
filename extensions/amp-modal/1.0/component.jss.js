import {createUseStyles} from 'react-jss';

const closeButton = {
  'font-size': '1e',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '1em',
  position: 'absolute',
  right: 0,
  top: 0,
};

const model = {
  'background-color': 'white',
  'box-shadow': '0 0 15px rgba(0,0,0,0.2)',
  height: 'unset !important',
  left: '50% !important',
  padding: '1em 2em 2em 2em',
  position: 'fixed !important',
  top: '50% !important',
  transform: 'translate(-50%, -50%)',
  width: 'unset !important',
};

const JSS = {
  closeButton,
  model,
};

// eslint-disable-next-line local/no-export-side-effect
export const useStyles = createUseStyles(JSS);
