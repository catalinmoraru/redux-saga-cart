
import fetch from 'isomorphic-fetch';
import {take, put , actionChannel} from 'redux-saga/effects';

import {
	SET_SHIPPING_FETCH_STATUS,
	setCanCheckOut,
	FETCHED
} from "../actions";

export function* checkoutAvailabilitySaga() {
	//const response = yield call( fetch , `http://localhost:8081/user/${id}`);

	const checkoutAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
	while ( true ) {
		const { status } = yield take(checkoutAvailabilityChannel);
		yield put(setCanCheckOut(status === FETCHED));
	}

}

