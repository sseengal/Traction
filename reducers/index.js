import { combineReducers } from 'redux';
import auth from './auth';
import testCriteria from './testCriteria';

export default combineReducers({
	auth,
	testCriteria
});
