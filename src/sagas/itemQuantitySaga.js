//import {delay} from 'redux-saga';

import fetch from 'isomorphic-fetch';
import {takeLatest, select, put, call } from 'redux-saga/effects';

import {
	INCREASE_ITEM_QUANTITY,
	DECREASE_ITEM_QUANTITY,
	setItemQuantityFetchStatus,
	decreaseItemQuantity,
	FETCHING,
	FETCHED
} from './../actions';

import {
	currentUserSelector
} from "../selectors";

export function* itemQuantitySaga() {
	yield [
		takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity),
		takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity)
	]
}


export function* handleIncreaseItemQuantity({id}) {
	yield put(setItemQuantityFetchStatus(FETCHING));
	const user = yield select(currentUserSelector);
	const response = yield call( fetch , `http://localhost:8081/cart/add/${user.get('id')}/${id}`);
	
	console.info("Got response :  ",response);

	if ( response.status !== 200 ){
		yield put (decreaseItemQuantity(id, true));
		alert('Sorry, not enough items');
	}
	yield put(setItemQuantityFetchStatus(FETCHED));

}

export function* handleDecreaseItemQuantity({id, local}) {
	if (local){
		return;
	}
	yield put(setItemQuantityFetchStatus(FETCHING));
	const user = yield select(currentUserSelector);
	const response = yield call( fetch , `http://localhost:8081/cart/remove/${user.get('id')}/${id}`);

	console.info("Got response :  ",response);

	if ( response.status !== 200 ){
		console.warn('Recieved non-200 status:', response);
		//yield put (decreaseItemQuantity(id, true));
		//alert('Sorry, not enough items');
	}
	yield put(setItemQuantityFetchStatus(FETCHED));

}