import {
	TEST_TYPE,
	CONFIDENCE_LEVEL,
	OBSERVATIONS,
	SAMPLE,
	BENCHMARK
} from './types';

export const updateTestType = testType => {
	return {
			type: TEST_TYPE,
			payload: testType
		};
};

export const updateConfidenceLevel = confidenceLevel => {
	return {
		type: CONFIDENCE_LEVEL,
		payload: confidenceLevel
	};
};

export const updateBenchmark = benchmark => {
	return {
			type: BENCHMARK,
			payload: benchmark
		};
};

export const updateObservations = observations => {
	return {
		type: OBSERVATIONS,
		payload: observations
	};
};

export const updateSample = sample => {
	return {
		type: SAMPLE,
		payload: sample
	};
};
