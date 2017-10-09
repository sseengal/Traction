import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { updateObservations, updateSample } from '../actions';
import { ModalView, ErrorView } from '../components/common/';


const SCREEN_WIDTH = Dimensions.get('window').width;

class Observations extends Component {
	static navigationOptions = ({ navigation }) => ({
	title: 'Data',
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
            showError: false,
        };
    }

    onClose() {
		this.setState({ 
			showModal: !this.state.showModal
		});
	}
	
	onErrorClose() {
		this.setState({ 
			showError: !this.state.showError
		});
	}

	onContinuePress = () => {
		if (this.checkInput()) {
			this.props.navigation.navigate('result');
		} 
	}

	checkInput() {
		if (+this.props.observations < +this.props.sample) {
			return true;
		} else {
			this.setState({ showError: !this.state.showError });
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.textInput}
					onChangeText={(observations) => this.props.updateObservations(observations)}	
					value={this.props.observations}
					keyboardType={'numeric'}
				/>
				<Text style={styles.text}>
					observations were made from a sample of
				</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={(sample) => this.props.updateSample(sample)}
					value={this.props.sample}
					keyboardType={'numeric'}
				/>
				<Button 
						title="What's this"
						raised
						buttonStyle={styles.buttonStyle}
						onPress={() => { this.setState({ showModal: !this.state.showModal }); }}
				/>
				<Button 
						title="See Result"
						raised
						buttonStyle={styles.buttonStyle}
						onPress={() => { this.onContinuePress(); }}
				/>
				
				<ModalView 
					visible={this.state.showModal}
					onClose={this.onClose.bind(this)}
				>
					Enter in your observations of an event you are trying to test.{'\n'}
					Keep in mind that you are testing binary (true/false, happen/did
					not happen) data. Low sample sizes are relevant as well!{'\n'}
					Examples:{'\n'}
					1) 10 hole-in-ones out of 44 attempts.{'\n'}
					2) 5 conversions out of 12 who landed.{'\n'}
					3) 2 sales after 7 pitches.{'\n'}
					and so on.
					
				</ModalView>
				<ErrorView 
					visible={this.state.showError}
					onErrorClose={this.onErrorClose.bind(this)}
				>
					Number of observations should be lower than the sample
				</ErrorView>
			</View>
		);
	}
}

const styles = {
	buttonStyle: {
		backgroundColor: '#0288D1',
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: SCREEN_WIDTH
	},
	text: {
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10
	}
};

const mapStateToProps = state => {
	const { testType,
	confidenceLevel,
	observations,
	sample } = state.testCriteria;

	return { testType, confidenceLevel, observations, sample };
};

export default connect(mapStateToProps, { updateObservations, updateSample })(Observations);
