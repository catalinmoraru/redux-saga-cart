//import {delay} from 'redux-saga';

import fetch from 'isomorphic-fetch';
import {take, fork, put , call} from 'redux-saga/effects';

import {
	SET_CART_ITEMS,
	setItemDetails
} from './../actions';


export function* itemDetailsSaga() {
	const { items } = yield take(SET_CART_ITEMS);
	yield items.map(item => fork(loadItemDetails,item));
}

export function* loadItemDetails(item) {
	console.info('Item? ', item);
	const { id } = item;
	const response = yield call( fetch , `http://localhost:8081/items/${id}`);
	const data = yield response.json();
	const info = data[0];
	yield put(setItemDetails(info));
}