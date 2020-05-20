import React from 'react';
import { render } from 'react-dom';
import {
  browserHistory, hashHistory, Router, applyRouterMiddleware,
} from 'react-router';
import { useScroll } from 'react-router-scroll';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { isCordova } from './utils/cordovaUtils';
import routes from './Root';
import muiTheme from './mui-theme';
import styledTheme from './styled-theme';
import { renderLog } from './utils/logging';


// May 2020, this was moved into a seperate file, so that the imports can be delayed
// until after the cordova 'deviceready' event (if we are in Cordova).
// eslint-disable-next-line no-unused-vars,import/prefer-default-export
export default function startReactApp () {
  renderLog('startReactApp');  // Set LOG_RENDER_EVENTS to log all renders
  console.log('startReactApp first line in startReactApp');
  console.log('startReactApp isCordova(): ', isCordova());

  const element = (
    // eslint-disable-next-line react/jsx-filename-extension
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={styledTheme}>
        <div>Hello mommy Im off to bag a commie</div>
        <Router
          history={isCordova() ? hashHistory : browserHistory}
          render={applyRouterMiddleware(useScroll(() => true))}
        >
          {routes()}
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  );

  // console.log('startReactApp before render');
  render(element, document.getElementById('app'));
}

