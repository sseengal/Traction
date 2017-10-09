import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
	componentDidMount() {
		//AsyncStorage.removeItem('fb_token');
		
		this.props.facebookLogin();
		// clear local storage (import AsyncStorage from react-native)
		
		//Below line may not be called always
		//this.onAuthComplete(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		if (props.token) {
			this.props.navigation.navigate('test');
		}
	}

	render() {
		return (
			<View />
		);
	}
}

function mapStateToProps({ auth }) {
	return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
