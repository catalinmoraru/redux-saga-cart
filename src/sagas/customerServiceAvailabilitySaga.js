
import fetch from 'isomorphic-fetch';
import {take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { connect } from '../createSocketConnection';
import { setCustomerServiceAvailability} from "../actions";


export function* customerServiceAvailabilitySaga() {
	const socket = connect();
	const chan = new eventChannel(emit=>{
		const enableSupportMessage = () => {
			emit(true);
		};

		const disableSupportMessage = () => {
			emit(false);
		};

		socket.on('SUPPORT_AVAILABLE', enableSupportMessage);
		socket.on('SUPPORT_NOT_AVAILABLE', disableSupportMessage);

		return () => {
			// code to remove the listeners if this is the kind of channel that would be created and recreated dinamically
		}

	});
	//const response = yield call( fetch , `http://localhost:8081/user/${id}`);

	while (true){
		let supportAvailable = yield take(chan);
		yield put(setCustomerServiceAvailability(supportAvailable));
	}
}