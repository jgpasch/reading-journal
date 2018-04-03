import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { markFinished } from '../actions/index_actions';

class BookCard extends Component {
  finished = () => {
    this.props.markFinished(this.props.book.id);
  }

  render() {
    const { book } = this.props;
    return (
      <Card style={styles.cardStyle}>
        <CardHeader style={styles.headerStyle}>
          <p>{book.title}{book.audiobook ? <span style={{paddingLeft: '5px'}} className="glyphicon glyphicon-headphones"></span> : ''}</p>
        </CardHeader>
        <CardText>
          <p>Pages: <span style={styles.bookInfoStyles}>{book.pages}</span></p>
          <p>Started:  <span style={styles.bookInfoStyles}>{book.start_date}</span></p>
          <p>Finished:  <span style={styles.bookInfoStyles}>{book.finish_date ? book.finish_date : 'In Progress'}</span></p>
        </CardText>
        <CardActions>
          {this.renderActions(book)}
        </CardActions>
      </Card>
    )
  }

  renderActions(book) {
    if (book.pause_start) {
      return <div style={{textAlign: 'center', marginRight: '0px'}}><RaisedButton label="Continue Reading"/></div>;
    } else if (!book.finish_date) {
      return <div style={{textAlign: 'center', marginRight: '0px'}}><RaisedButton label="Finished" onClick={this.finished} primary/></div>;
    } else {
      return '';
    }
  }
}

const styles = {
  cardStyle: {
    width: '300px',
    height: '290px',
    float: 'left',
    margin: '10px 30px'
  },
  headerStyle: {
    textAlign: 'center'
  },
  bookInfoStyles: {
    float: 'right'
  }
}

export default connect(null, { markFinished })(BookCard);