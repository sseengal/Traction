
import React, { Component } from 'react';
import { View, Text, Picker, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { CardSection, ModalView } from '../components/common/';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ConfidenceLevelScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
	title: 'Confidence Level',
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
            showModal: false
        };
    }

    onClose() {
	this.setState({ showModal: !this.state.showModal });
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
			default:
				return null;
		}	
	}

	render() {		
		return (
			<View style={styles.container}>
				<Text>I want a Confidence Level of</Text>
				<CardSection style={{ flexDirection: 'column' }}>
					<Picker
						style={styles.picker}
						selectedValue={this.props.confidenceLevel}
						onValueChange={
							confidenceLevel => this.props.updateConfidenceLevel(
								confidenceLevel
							)}
					>
						<Picker.Item label="99" value={99} />
						<Picker.Item label="95" value={95} />
						<Picker.Item label="9" value={90} />
					</Picker>
				</CardSection>
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
				<ModalView 
					visible={this.state.showModal}
					onClose={this.onClose.bind(this)}
				>
					Not to be confused with the confidence "interval", 
					a confidence "level" is how sure YOU want to be of the interval we are trying 
					to calculate.{'\n'}
					Phew! {'\n'}
					Now you can't say "I want to be 100% sure." because well, you won't need statistics in 
					that case.{'\n'}
					A higher confidence level, say 99%, will give you a wider confidence interval, 
					say 32% to 70% and a lower level(95%) will give you a narrower interval
					(47% to 60%).{'\n'}

				</ModalView>
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
	buttonStyle: {
		backgroundColor: '#0288D1',
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,

	}
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps, actions)(ConfidenceLevelScreen);
