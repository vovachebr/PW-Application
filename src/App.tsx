import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';

import reducer from './redux/reducers';
import { ApplicationHeader } from './views';
import { ApplicationRouter } from './containers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Provider store={store}>
        <ApplicationHeader />
        <ApplicationRouter />
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
