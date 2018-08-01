import fetch from 'isomorphic-fetch';
import {take, put, call} from 'redux-saga/effects';


import {
	SET_CURRENT_USER,
	setTaxRate
} from "../actions";


export function* taxRateSaga() {
	// wait for action dispatch
	const { user } = yield take(SET_CURRENT_USER);

	// whenever the SET_CURRENT_USER event runs

	const { country } = user;
	const response = yield call( fetch , `http://localhost:8081/tax/${country}`);
	const { rate } = yield response.json();
	console.info('tax rate: ', rate);
	yield put(setTaxRate(rate));

}

