//import {delay} from 'redux-saga';

import fetch from 'isomorphic-fetch';
import {take, put, call, apply } from 'redux-saga/effects';

import {
	GET_CURRENT_USER_INFO,
	setCurrentUser
} from './../actions';


export function* currentUserSaga() {
	// while (true) {
	// 	yield delay(1000);
	// 	console.info("User saga loop");
	//
	// }

	const { id } = yield take(GET_CURRENT_USER_INFO);

	const response = yield call( fetch , `http://localhost:8081/user/${id}`);
	const data = yield apply(response, response.json);
	// console.info("ID",id);
	// console.info("Data? ",data);

	yield put(setCurrentUser(data));
}