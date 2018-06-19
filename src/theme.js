import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500,
  orangeA200,
  grey100,
  grey300,
  grey500,
  white,
  darkBlack,
  fullBlack
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#24a0e9',
    primary2Color: '#2090d1',
    primary3Color: '#999999',
    accent1Color: orangeA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  }
});

export default muiTheme;
