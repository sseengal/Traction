import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';

import {
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL,
	FACEBOOK_LOGOUT_SUCCESS,
	FACEBOOK_LOGOUT_FAIL
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
	const token = await AsyncStorage.getItem('fb_token');
	if (token) {
		//Dispatch an saying FB login is done
		dispatch({
			type: FACEBOOK_LOGIN_SUCCESS, 
			payload: token
		});
	} else {
		// Prompt FB Login Process
		doFacebookLogin(dispatch);
	}
};


	const doFacebookLogin = async dispatch => {
		const { type, token } = await Facebook.logInWithReadPermissionsAsync('724152417782873', {
			permissions: ['public_profile']
		});

		if (type === 'cancel') {
			return dispatch({ type: FACEBOOK_LOGIN_FAIL });
		}
			await AsyncStorage.setItem('fb_token', token);
			dispatch({
				type: FACEBOOK_LOGIN_SUCCESS, 
				payload: token
			});	
	};

// Sign Out

export const facebookLogout = () => async dispatch => {
	const token = await Facebook.logOut();
	if (token) {
		dispatch({
			type: FACEBOOK_LOGOUT_SUCCESS,
			payload: token
		});
	} else { 
		dispatch({
			type: FACEBOOK_LOGOUT_FAIL,
			payload: token
			});
		}
};
