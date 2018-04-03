import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';
import * as moment from 'moment';
import { createBook } from '../actions/index_actions';
import './createbook.css';

 class CreateBook extends Component {

  componentDidMount() {
    // this.firstInput.focus();
  }

  onSubmit(values) {
    console.log(values);
    this.props.createBook(values);
    this.props.reset();
    console.log(this.firstInput);
  }

  render() {
     const { handleSubmit } = this.props;

     return (
      <div className="row" style={styles.wrapperStyle}>
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="create-form" style={styles.formStyle} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Book Title"
              name="title"
              component={this.renderField}
              ref={(input) => { this.firstInput = input }}
              />
              <Field
              label="# of Pages"
              name="pages"
              component={this.renderField}
              />
              <Field
              label="Start Date"
              name="start_date"
              component={this.renderDateField}
              />
              <Field
              label="Finish Date"
              name="finish_date"
              component={this.renderDateField}
              />
            <RaisedButton type="submit" label="Save" primary />
          </form>
        </div>
      </div>
     );
   }

   renderField(field) {
    const { meta: { touched, error }} = field;
    const divCName = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={divCName} style={{height: '80px'}}>
        <label className="control-label" style={styles.labelStyle}>{field.label}</label>
        <input
          className="form-control focused-input"
          style={styles.inputStyle}
          type="text"
          {...field.input}
        />
        <div className="text-help" style={styles.errorStyle}>
          {field.meta.touched && field.meta.touched && <span> {field.meta.error} </span> }
        </div>
      </div>
    )
   }

   renderDateField(field) {
     console.log(field);
    const { meta: { touched, error }} = field;
    const divCName = `form-group ${touched && error ? 'has-danger' : ''}`

    const iden = field.label === "Start Date" ? 'start' : 'finish'

    return (
      <div className={divCName} style={{height: '80px', position: 'relative'}}>
        <label className="control-label" style={styles.labelStyle}>{field.label}</label>
        <DatePicker className="form-control focused-input dater" id={iden} style={styles.inputStyle} onChange={(event, value) => field.input.onChange(moment(value).format('M/DD/YY'))} autoOk formatDate={(date) => moment(date).format('M/DD/YY')} onFocus={function() { document.getElementById(this.id).click(); }} />
        <div className="text-help" style={styles.errorStyle}>
          {field.meta.touched && field.meta.touched && <span> {field.meta.error} </span> }
        </div>
      </div>
    )
   }
 }

function validate(values) {
  let errors = {};
  console.log('do i ever run');

  const fields = {
    title: 'book title',
    pages: 'number of pages',
    start_date: 'start date',
    finish_date: 'finish date'
  };
  errors = checkForEmpty(values, fields, errors);

  return errors;
}

const styles = {
  wrapperStyle: {
  height: '100%',
  display: 'flex',
  // justifyContent: 'center',
  alignItems: 'center',
  flex: '1'
  },
  labelStyle: {
    textSpacing: '.6px',
    fontSize: '13px',
    marginBottom: '3px'
  },
  formStyle: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '6px'
  },
  errorStyle: {
    fontSize: '14px'
  },
  inputStyle: {
    border: 'none',
    borderBottomColor: '#F4F9FB',
    backgroundColor: 'rgb(244,249,251)',
    boxShadow: '0px 2px 5px 0px #E6E9EC',
    borderColor: 'rgb(80,80,80)'
  },
  cancelDateStyles: {
    position: 'absolute',
    right: '5px',
    top: '29px',
    borderRadius: '12.5px',
    padding: '1px',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    textAlign: 'center'
  }
}

function checkForEmpty(values, fields, errors) {
  _.forEach(fields, (val, key) => {
    if (!values[key]) {
      errors[key] = `Please enter the ${val}`;
    }
  });
  return errors;
}

export default reduxForm({
  form: 'CreateForm',
})(
  connect(null, { createBook })(CreateBook)
);
