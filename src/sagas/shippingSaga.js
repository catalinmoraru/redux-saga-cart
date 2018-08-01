import fetch from 'isomorphic-fetch';
import {takeLatest, put, select, call} from 'redux-saga/effects';


import {
	SET_CART_ITEMS,
	INCREASE_ITEM_QUANTITY,
	DECREASE_ITEM_QUANTITY,
	FETCHED,
	FETCHING,
	setShippingFetchStatus,
	setShippingCost
} from "../actions";


import {
	cartItemsSelector
} from "../selectors";

function* shipping() {
	// aggregates a list of all item id's in the cart and send it to the server to calculate the shipping cost
	yield put(setShippingFetchStatus(FETCHING));
	const items = yield select(cartItemsSelector);

	// reduce the items to a string by taking each item and for every unit of it's quantity adding it's id to the string

	let itemRequestString = items.reduce((string,item) => {
		for ( let i = 0; i < item.get(`quantity`); i++) {
			string += item.get(`id`) + ',';
		}
		return string;
	},"".replace(/,\s*$/,''));

	//itemRequestString = 'I10000,I40000';
	itemRequestString = itemRequestString.slice(0, -1);
	console.info('Made item request string', itemRequestString);

	const response = yield call( fetch , `http://localhost:8081/shipping/${itemRequestString}`);
	const { total } = yield response.json();
	yield put(setShippingCost(total));
	yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
	// if any of them are dispatched it will start the shipping process
	// if any of them are dispatched again it will stop the process and then restart it again
	yield takeLatest([SET_CART_ITEMS,INCREASE_ITEM_QUANTITY,DECREASE_ITEM_QUANTITY],shipping);

}