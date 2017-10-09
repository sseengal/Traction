
import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Select, Option } from 'react-native-select-list';

import { ModalView } from '../components/common/';
import { updateTestType } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TEST_MODALS = [
	{ text: 'A confidence (interval) test is an estimate of how sure you want to be of the population average', color: '#03A9F4' },
	{ text: 'Usability metrics at your fingertips ..', color: '#009588' },
	{ text: '.. helping you make the right decision promptly.', color: '#03A9F4' }
];

class TestScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
	title: 'Test Type',
	headerRight: (
			<Button 
			title="Know more" 
			onPress={ 
				//navigation.navigate('settings');
					() => console.log(this.props.navigation.state)
					//this.setState({ showModal: !this.state.showModal })
				}
			backgroundColor="rgba(0,0,0,0)"
			color="rgba(0, 122, 255, 1)"
			/>
	),
	style: {
		marginTop: Platform.OS === 'android' ? 24 : 0,
		backgroundColor: '#551B22'
	},
	headerLeft: null
	})

	constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            helpText: {
	           	confidenceText: 'What is Confidence Testing?',
	           	benchmarkText: 'What is Benchmark Testing?',
	           	correlateText: 'What is Correlation Testing?',
            },
            modalText: {
            	confidenceText: 'A confidence (interval) test is an estimate of how sure you want to be of the population average (mean). For eg: 4 out of 7 users faced a particular problem when going through a checkout. In the future, how many people will plausibly face the same problem if it is left unchecked? Answer: Run the confidence (interval) test.',
            	benchmarkText: 'A Benchmark test is when you compare an observation against a benchmark. For eg: if 6 out of 13 people are able to complete a task, can we be 95% sure that atleast half (50% benchmark) of the users will be able to complete the task? Answer: Run a Benchmark test.',
            },
        };
    }

	onContinuePress = () => {
		console.log(this.props.testCriteria.testType);
		switch (this.props.testCriteria.testType) {
			case 'confidence':
				this.props.navigation.navigate('observations');
				return null;
			case 'benchmark':
				this.props.navigation.navigate('benchmark');
				return null;
			case 'correlate':
				this.props.navigation.navigate('correlate');
				return null;
			default:
				return null;
		}	
	}

	onClose() {
		this.setState({ showModal: !this.state.showModal });
	}

	modalData() {
		switch (this.props.testCriteria.testType) {
			case 'confidence':
				return (this.state.modalText.confidenceText);
			case 'benchmark':
				return (this.state.modalText.benchmarkText);
			default:
				return null;
		}	
	}

	updateTestType(testType) {
		this.props.updateTestType(testType);
	}

	helpText() {
    	switch (this.props.testCriteria.testType) {
			case 'confidence':
				return (this.state.helpText.confidenceText);
			case 'benchmark':
				return (this.state.helpText.benchmarkText);
			case 'correlate':
				return (this.state.helpText.correlateText);
			default:
				return null;
		}	
	}

	render() {		
		return (
			<View style={styles.container}>
				<View style={styles.testLineView}>
					<Text style={styles.baseText}>I want to run a</Text>
					<Select 
						onSelect={testType => this.updateTestType(testType)} 
						caret='down'
						selectStyle={styles.selectStyle}
						selectTextStyle={styles.selectTextStyle}
					>
							<Option value='confidence'>Confidence Test</Option>
							<Option value='benchmark'>Benchmark Test</Option>
							<Option value='correlate'>Correlation Test</Option>
							<Option value='compare' last>Compare</Option>
					</Select>
					<Text style={styles.baseText}>
					on some data.
					</Text>
				</View>
				<View style={styles.helpView}>
					<Button 
							title={this.helpText()}
							small
							textStyle={styles.helpText}
							buttonStyle={styles.secondaryButton}
							onPress={() => { this.setState({ showModal: !this.state.showModal }); }}
					/>
					<View style={styles.divider} />
					<Button 
							title="Show me examples"
							small
							textStyle={styles.helpText}
							buttonStyle={styles.secondaryButtonStyle}
							onPress={console.log('examples pressed')}
					/>
				</View>
				
					<Button 
							title="Continue"
							small
							textStyle={styles.primaryButtonText}
							//containerViewStyle={styles.continueView}
							buttonStyle={styles.primaryButton}
							onPress={() => { this.onContinuePress(); }}
					/>
				
				<ModalView 
					visible={this.state.showModal}
					onClose={this.onClose.bind(this)}
				>
					{ this.modalData() }
				</ModalView>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center', 
		backgroundColor: '#FFFFFF',
	},
	primaryButton: {
		backgroundColor: '#FC3A52',
		width: SCREEN_WIDTH,
		//alignItems: 'flex-start',
	},
	secondaryButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 100,
	},
	baseText: {
		fontFamily: 'Avenir Next',
		fontSize: 18,
		paddingTop: 10,
		paddingBottom: 10
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	helpText: {
		fontFamily: 'Avenir Next',
		color: '#4990E2',
		fontSize: 14,
	},
	helpView: {
		flex: 1.1,
		paddingTop: 30,
		paddingBottom: 30,
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	primaryButtonText: {
	   fontFamily: 'Avenir Next',
	},
	testLineView: {
		flex: 3,
		paddingTop: 30,
		paddingLeft: 30,
		paddingRight: 30,
		justifyContent: 'center',
	},
	selectStyle: {
		backgroundColor: '#F7F7F7',
		padding: 20,
		borderRadius: 100,
	},
	selectTextStyle: {
		fontFamily: 'Avenir Next',
		fontSize: 18,
	},
	divider: {
		width: SCREEN_WIDTH / 3,
		backgroundColor: '#555555',
		//alignItems: 'flex-end',
		height: 1,
		opacity: 0.1,
	},
};

const mapStateToProps = state => {
	return state;
	//const testType = state.testType;
	//return { testType };
};

export default connect(mapStateToProps, { updateTestType })(TestScreen);

