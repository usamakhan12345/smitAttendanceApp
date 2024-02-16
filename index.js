/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import {store} from "./src/Components/redux/Store/index"
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from "./src/Components/redux/Store/index"

const ReduxApp = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  );

AppRegistry.registerComponent(appName , ()=> ReduxApp);

