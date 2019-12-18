import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { ConfigureStore } from './redux/configureStore';

const { persistor, store } = ConfigureStore();

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<></>}
                persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    );
  }
}

export default App;
