import React, { Component } from 'react';
import { View, Platform, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import RunTest from '../components/RunTest';
import { ModalView } from '../components/common/';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Result extends Component {
	static navigationOptions = ({ navigation }) => ({
	title: 'Result',
	headerRight: (
			<Button 
			title="Know more" 
			onPress={() => {}}
			backgroundColor="rgba(0,0,0,0)"
			color="rgba(0, 122, 255, 1)"
			/>
	),
	style: {
	marginTop: Platform.OS === 'android' ? 24 : 0
	}
	})

	constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    onClose() {
	this.setState({ showModal: !this.state.showModal });
	}

	onContinuePress = () => {
		this.props.navigation.navigate('test');
	}

	render() {
		return ( 
		<View style={styles.container}>
		<RunTest />
			<Button 
				title="What's this"
				raised
				buttonStyle={styles.buttonStyle}
				onPress={() => { this.setState({ showModal: !this.state.showModal }); }}
			/>
			<Button 
				title="Run Again"
				raised
				buttonStyle={styles.buttonStyle}
				onPress={() => { this.onContinuePress(); }}
			/>
			<ModalView 
				visible={this.state.showModal}
				onClose={this.onClose.bind(this)}
			>
				Result screen Modal
			</ModalView>
		</View>
		);
	}
} 

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		paddingTop: 40,
		paddingBottom: 40
	},
	buttonStyle: {
		backgroundColor: '#0288D1',
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,

	}
};
