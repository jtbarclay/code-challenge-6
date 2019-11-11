import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Your saga should listen for the action type of `GET_ZOO_ANIMALS`
function* rootSaga() {
    // YOUR CODE HERE
    yield takeEvery('GET_ZOO_ANIMALS', getAnimalsSaga);
    yield takeEvery('DELETE_ANIMAL', deleteAnimalSaga);
    yield takeEvery('GET_CLASSES', getClassSaga);
    yield takeEvery('POST_ANIMAL', postAnimalSaga);
}

// get all rows from db
function* getAnimalsSaga() {
    try {
        const zooResponse = yield axios.get('/zoo');
        yield put({ type: 'SET_ZOO_ANIMALS', payload: zooResponse.data});
    } catch (error) {
        console.log('error fetching zoo animals');
    }
}

// delete row from db
function* deleteAnimalSaga(action) {
    try {
        yield axios.delete(`/zoo/${action.payload}`);
        yield put({ type: 'GET_ZOO_ANIMALS'});
    } catch (error) {
        console.log('error deleting zoo animal');
    }
}

// get classes from db
function* getClassSaga() {
    try {
        const classResponse = yield axios.get('/zoo/classes');
        yield put({ type: 'SET_CLASSES', payload: classResponse.data});
    } catch (error) {
        console.log('error fetching classes', error);
    }
}

// send new animal to db
function* postAnimalSaga(action) {
    try {
        yield axios.post('/zoo', action.payload);
        yield put({ type: 'GET_ZOO_ANIMALS' });
    } catch (error) {
        console.log('error sending new animal', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store class and number of unique animals in that class
const zooAnimals = (state = [], action) => {
    switch (action.type) {
        case 'SET_ZOO_ANIMALS':
            return action.payload;
        default:
            return state;
    }
}

const animalClasses = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        zooAnimals,
        animalClasses,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
