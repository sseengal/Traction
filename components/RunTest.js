import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { sqrt, pow } from 'math';
//import PD from 'probability-distributions';

import * as actions from '../actions';


class RunTest extends Component {

	//Calculate Z-value from confidence level
	
	zValue = () => {
			switch (this.props.confidenceLevel) {
				case 99:
					console.log(2.576);
					return 2.576;
				case 95:
					console.log(1.96);
					return 1.96;
				case 90:
					console.log(1.64);
					return 1.645;
				default:
					return null;
			}
		};

	//Calculate Factorial of a number
	factorial(num) {
		if (num === 0) { 
			return 1;
		}
		else
		{ 
			return num * this.factorial(num - 1); 
		}
	}

	//Binomial distribution calculator
	bdc() {
		const sFac = this.factorial(this.props.sample);
		const oFac = this.factorial(this.props.observations);
		const diffFac = this.factorial(this.props.sample - this.props.observations);
		const bm = this.props.benchmark / 100;
		const obs = this.props.observations;
		const samp = this.props.sample;

		let prob = 0;
		for (let j = obs; j <= samp; j++) {
			prob += (sFac / (this.factorial(j) * this.factorial(samp - j))) * pow(bm, j) * pow((1 - bm), (samp - j));
		}
		return ((1 - prob) * 100);
	}

	// Adjusted Probability for confidence interval calculator
	pAdj = () => {
		const p = this.props.observations / this.props.sample;
		const s = this.props.sample;
		const zSqr = (this.zValue() * this.zValue());

		return ((+s * +p) + (zSqr / 2)) / (+s + +zSqr);
		};

	// Adjusted N for confidence interval calculator
	nAdj = () => {
		const zSqr = (this.zValue() * this.zValue());
		return +this.props.sample + zSqr;
	}

	// CI upper value
	upperValue = () => {
		const answer = 
			this.pAdj() + this.zValue() * sqrt(this.pAdj() * (1-this.pAdj()) / this.nAdj());
		return answer;
		};

	// CI lower value
	lowerValue = () => {
		const answer = 
			this.pAdj() - this.zValue() * sqrt(this.pAdj() * (1-this.pAdj()) / this.nAdj());
		return answer;
		};


	successRate = () => {
		return (+this.props.observations / +this.props.sample);
	}

	zScore() {
		const b = +this.props.benchmark / 100;
		const s = +this.props.sample;
		const answer = 
			(this.successRate() - b) / sqrt((b * (1 - b)) / s);
		return answer;
	}

// Cumulative Distribution Function
	cdf = (x, mean, variance) => {
		return 0.5 * (1 + this.erf((x - mean) / (Math.sqrt(2 * variance))));
	}

	erf = (x) => {
  // save the sign of x
  const sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  // constants
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  // A&S formula 7.1.26
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y; // erf(-x) = -erf(x);
}

//standard cumulative distribution function
stdCdf = (x) => {
  return this.cdf(x, 0, 1);
}

// All tests calculated here ********

	testResult = () => {
		switch (this.props.testType) {
			case 'confidence':
				return (
					<View>
						<Text>helloo your Z-value for { this.props.confidenceLevel } is { this.zValue() }</Text>
						<Text>helloo your Padjusted value for { this.props.observations } out of
						{ this.props.sample } is { this.pAdj() } And nAdjusted Value is { this.nAdj() } 
						Your Upper range is { this.upperValue() }
						Your Lower range is { this.lowerValue() }
						</Text>
					</View>
				);
			case 'benchmark':
			// one sample z test
				if ((this.props.sample - this.props.observations >= 15) && (this.props.observations >= 15)) {
					const zScore = this.zScore();
					return (
						<View>
							<Text>
								You can be { this.stdCdf(zScore) * 100 } % sure that atleast the benchmark of { this.props.benchmark } % 
								will be met.
							</Text>
						</View>
					);
				} else {
				// one sample binomial
					return (
						<View>
							<Text>
								There is a { this.bdc() } % chance that atleast the benchmark of { this.props.benchmark } %
								will be met.
							</Text>
						</View>
					);
				}
			default:
				return null;
		}	
	};

	render() {
		console.log(this.props.testType);
		return (
			this.testResult()
		);
	}
}

const mapStateToProps = (state) => {
	const { testType,
	confidenceLevel,
	observations,
	sample,
	benchmark } = state.testCriteria;

	return { testType, confidenceLevel, observations, sample, benchmark };
};

export default connect(mapStateToProps, actions)(RunTest);
