import axios from 'axios';
import firebase from '../firebaseSetup';
import _ from 'lodash';
import { FETCH_BOOKS, CREATE_BOOK, UPDATE_BOOK, LOGIN, LOGOUT } from './actionTypes';

const url = 'http://localhost:8080';

const db = firebase.database();
const booksRef = db.ref('/');

function createPayload(list) {
  return _.map(list, (value, key) => Object.assign({}, value, {id: key}));
}

export function fetchBooks() {
  return dispatch => {
    booksRef.on('value', snapshot => {
      console.log(createPayload(snapshot.val()));
      dispatch({
        type: FETCH_BOOKS,
        payload: createPayload(snapshot.val())
      });
    });
  }
}


export function createBook(values) {
  console.log(values);
  return dispatch => {
    booksRef.push()
      .set(values, (err) => {
        if (err) {
          console.log(err);
          throw new Error();
        }
        dispatch({
          type: CREATE_BOOK,
          payload: values
        });
      });
  }
}

export function markFinished(id) {
  return dispatch => {
    db.ref(`/${id}`).update({
      finish_date: getDate()
    }).then(data => {
      dispatch({ type: UPDATE_BOOK, payload: id });
    })
  }
}

function getDate() {
  const today = new Date();
  const date = today.getDate().toString().padStart(2,"0");
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString().substring(2);
  return `${month}/${date}/${year}`;
}

export function login(creds) {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        console.log('watch func should be triggered now');
      });
  }
}
