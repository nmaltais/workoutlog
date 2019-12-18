import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routines } from './routines';
import { exercises } from './exercises';
import { calendar } from './calendar';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';


const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
  }

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            routines,
            exercises,
            calendar
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return { persistor, store };
}
