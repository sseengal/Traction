import React, { Component } from 'react';
import { Text, View, Modal, TouchableHighlight } from 'react-native';
import { CardSection } from './cardSection';


const ModalView = ({ children, visible, onClose }) => {
	const { containerStyle, textStyle, cardSectionStyle } = styles;

	return (
		<Modal
			animationType="fade"
			onRequestClose={() => {}}
			transparent
			visible={visible}
		>
			<View style={containerStyle}>
				<CardSection style={cardSectionStyle}>
					<Text style={textStyle}>{children}</Text>
				</CardSection>
				<CardSection style={cardSectionStyle}>
					<TouchableHighlight 
					onPress={onClose}
					> 
						<Text>Dismiss</Text> 
					</TouchableHighlight>
				</CardSection>
			</View>
		</Modal>
	);
};

const styles = {
	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		flex: 1,
		fontSize: 16,
		textAlign: 'left',
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	}
};

export { ModalView };
