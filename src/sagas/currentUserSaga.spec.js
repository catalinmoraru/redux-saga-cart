import {take, put, call, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
	GET_CURRENT_USER_INFO,
	setCurrentUser
} from './../actions';


import { currentUserSaga} from "./currentUserSaga";


describe("Test the current user saga", () => {
	test("It fetches and puts the current user's data", () => {
		// define a mock id and user
		const id = 'NCC1701';
		const user = { name: "Jean Luc"};

		// mock of the response
		const json = () => {};
		const response = {json};

		// create agenerator object by invoking current user saga
		const gen = currentUserSaga();

		// anything after yield we can test

		// we are passing in values returned by take
		expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));
		expect(gen.next({id}).value).toEqual(call(fetch,`http://localhost:8081/user/${id}`));
		expect(gen.next(response).value).toEqual(apply(response,json));
		expect(gen.next(user).value).toEqual(put(setCurrentUser(user)));


	});
});