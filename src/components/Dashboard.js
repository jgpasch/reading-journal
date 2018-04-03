import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchBooks } from '../actions/index_actions';
import BookCard from './BookCard';
import './dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    this.sortBooks();
    return (
      <div>
        <div>{this.props.books.length} books read</div>
        <div className="book-wrapper">
          {this.showBooks()}
          <div style={styles.clearDiv}></div>
        </div>
      </div>
    );
  }

  showBooks() {
    console.log('this one is me');
    return this.props.books.map((sub, i) => {
      return <BookCard key={i} book={sub} />;
    });
  }

  sortBooks() {
    this.props.books.sort((a, b) => {
      let aDate =
        a.start_date.split('/')
        .map(elem => parseInt(elem));
      let bDate =
        b.start_date.split('/')
        .map(elem => parseInt(elem));
      if (aDate[2] < bDate[2]) { // book A year is before book B year
        return 1;
      } else if (aDate[2] > bDate[2]) { // book A year is after book B year
        return -1;
      } else { // book A and B from same year, check month
          if (aDate[0] < bDate[0]) { // book A month earlier than book B month
            return 1;
          } else if (aDate[0] > bDate[0]) { // book A month later than book B month
            return -1;
          } else { // books from same month, check day.
            if (aDate[1] < bDate[1]) { // book A date earlier than book B date
              return 1;
            } else if (aDate[1] > bDate[1]) { // book A date later than book B date
              return -1;
            } else { // books from the same exact starting day
              return 0;
            }
          }
      }
    });
  }
}

const styles = {
  clearDiv: {
    clear: 'both'
  }
};

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

export default connect(mapStateToProps, { fetchBooks })(Dashboard);
