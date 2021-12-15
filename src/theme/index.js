import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
    tertiary: {
      main: red[500],
    },
    cuarto: {
      main: amber[500],
    },
    text: {
      primary: '#000000',
      secondary: '#444444'
    }
  },
  shadows,
  typography
});

export default theme;
