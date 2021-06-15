import logger from 'redux-logger';
import RcReduxModel from 'rc-redux-model';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import globalModel from '@src/store/globalModel';
import financeModel from '@src/store/financeModel';

const reduxModel = new RcReduxModel([globalModel, financeModel]);
const reducerList = combineReducers(reduxModel.reducers);

export default createStore(reducerList, applyMiddleware(reduxModel.thunk, logger));
