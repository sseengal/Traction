import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
	renderButton() {
			return (
				<View style={{ marginTop: 20 }}>
						<Button 
							title="Continue"
							raised
							buttonStyle={styles.buttonStyle}
							onPress={this.props.onComplete}
						/>
				</View>
			);
	}

	renderSlides() {
		return this.props.data.map((slide) => {
			return (
				<View 
					key={slide.text} 
					style={[styles.slideStyle, { backgroundColor: slide.color }]} 
				>
					<Text style={styles.textStyle}>{slide.text}</Text>
					{this.renderButton()}
				</View>
			);
		});
	}

	render() {
		return (
			<ScrollView 
				horizontal
				style={{ flex: 1 }}
				pagingEnabled
			>
				{this.renderSlides()}
			</ScrollView>
		);
	}
}

const styles = {
	slideStyle: {
		flex: 1,
		width: SCREEN_WIDTH,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textStyle: {
		fontSize: 30,
		color: 'white',
		textAlign: 'center'
	},
	buttonStyle: {
		backgroundColor: '#0288D1',
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,

	}
};

export default Slides;
