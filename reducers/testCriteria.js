import {
	TEST_TYPE,
	CONFIDENCE_LEVEL,
	OBSERVATIONS,
	SAMPLE,
	BENCHMARK
} from '../actions/types';

const INITIAL_STATE = {
	testType: 'confidence',
	confidenceLevel: 99,
	observations: 120,
	sample: 450,
	benchmark: 50
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case TEST_TYPE:
			return { ...state, testType: action.payload };
		case CONFIDENCE_LEVEL:
			return { ...state, confidenceLevel: action.payload };
		case OBSERVATIONS:
			return { ...state, observations: action.payload };
		case SAMPLE:
			return { ...state, sample: action.payload };
		case BENCHMARK:
			return { ...state, benchmark: action.payload };
		default:
			return state;
	}
}

