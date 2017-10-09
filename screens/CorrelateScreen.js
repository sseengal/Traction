import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';

// Table data as a list of array.
const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];


class CorrelateScreen extends Component {

	render() {		
		return (
			<View>
				<Table
					rowHeight={50}
					rowsCount={rows.length}
					width={5000}
					height={5000}
					headerHeight={50}
				>
				<Column
					header={<Cell>Col 1</Cell>}
					cell={<Cell>Column 1 static content</Cell>}
					width={2000}
				/>
				<Column
					header={<Cell>Col 3</Cell>}
					cell={({ rowIndex, ...props }) => (
					<Cell {...props}>
						Data for column 3: {rows[rowIndex][2]}
					</Cell>
				)}
					width={2000}
				/>
				</Table>
			</View>
		);
	}
}


const mapStateToProps = state => {
	// const { benchmark } = state.testCriteria;
	// return { benchmark };
	return state;
};

export default connect(mapStateToProps)(CorrelateScreen);
