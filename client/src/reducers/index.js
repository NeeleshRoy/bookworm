import { combineReducers } from 'redux';
import books from './bookReducer';
import user from './userReducer';

const rootReducer = combineReducers({
	books,
	user
});

export default rootReducer;
