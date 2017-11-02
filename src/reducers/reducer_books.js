import { FETCH_BOOKS, CREATE_BOOK, UPDATE_BOOK } from '../actions/actionTypes';

export default function(state = [], action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_BOOKS:
      console.log('here');
      console.log(action.payload);
      return action.payload;

    case CREATE_BOOK:
      return [...state, action.payload];

    case 'login':
      console.log('hello, its me');

    default:
      return state;
  }
}
