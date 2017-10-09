import { AppLoading } from 'expo';
import _ from 'lodash';
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Platform } from 'react-native';
import Slides from '../components/slides';

const SLIDE_DATA = [
	{ text: 'Welcome to Traction', color: '#03A9F4' },
	{ text: 'Usability metrics at your fingertips ..', color: '#009588' },
	{ text: '.. helping you make the right decision promptly.', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
	state = { token: null }

	async componentWillMount() {
		const token = await AsyncStorage.getItem('fb_token');

		if (token) {
			this.props.navigation.navigate('test');
			this.setState({ token });
		} else {
			this.setState({ token: false });
		}
	}

	onSlidesComplete = () => {
		this.props.navigation.navigate('auth');
	}

	render() {
		if (_.isNull(this.state.token)) {
			if (Platform.OS === 'android') {
				return <ActivityIndicator size='large' style={styles} />;
			} 
			return <AppLoading />;
		}
		return (
			<Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
		);
	}
}

const styles = {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center'
};

export default WelcomeScreen;
