
import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { ModalView, ErrorView } from '../components/common/';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class BenchmarkScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
	title: 'Set Benchmark',
	headerRight: (
			<Button 
			title="Know more" 
			onPress={() => { 
				//navigation.navigate('settings'); 
				console.log('help');
			}}
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
            showModal: false,
            showError: false
        };
    }

    onClose() {
	this.setState({ showModal: !this.state.showModal });
	}

	onErrorClose() {
		this.setState({ 
			showError: !this.state.showError
		});
	}

	onContinuePress = () => {
		if (this.checkInput()) {
			this.props.navigation.navigate('observations');
		}
	}

	checkInput() {
		if ((+this.props.benchmark < 0) || (+this.props.benchmark > 100)) {
			this.setState({ showError: !this.state.showError });
		} else {
			return true;
		}
	}

	render() {		
		return (
			<View style={styles.container}>
				<Text>I want a benchmark of (0-100%)</Text>
					<TextInput
						style={styles.textInput}
						onChangeText={(benchmark) => this.props.updateBenchmark(benchmark)}	
						value={this.props.benchmark}
						keyboardType={'numeric'}
					/>
				<Button 
						title="What's this"
						raised
						buttonStyle={styles.buttonStyle}
						onPress={() => { this.setState({ showModal: !this.state.showModal }); }}
				/>
				<Button 
						title="Continue"
						raised
						buttonStyle={styles.buttonStyle}
						onPress={() => { this.onContinuePress(); }}
				/>
				<Button 
						title="Console Log"
						raised
						buttonStyle={styles.buttonStyle}
						onPress={() => { console.log(this.props.testCriteria); }}
				/>
				<ModalView 
					visible={this.state.showModal}
					onClose={this.onClose.bind(this)}
				>
					Benchmark Test Help
				</ModalView>
				<ErrorView 
					visible={this.state.showError}
					onErrorClose={this.onErrorClose.bind(this)}
				>
					Benchmark value should be a percentage between 0-100.
				</ErrorView>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	picker: {
		width: SCREEN_WIDTH,
	},
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: SCREEN_WIDTH
	},
	buttonStyle: {
		backgroundColor: '#0288D1',
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,

	}
};

const mapStateToProps = state => {
	const { benchmark } = state.testCriteria;
	return { benchmark };
	//return state;
};

export default connect(mapStateToProps, actions)(BenchmarkScreen);
