import React from 'react';
import axios from 'axios';
import { Features, Page, InputGroup, Submit, ErrorMsg } from '../styles/RegisterStyles.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fields = [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'retyped', label: 'Retype Password', type: 'password' }
    ];
    this.initialState = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      retyped: '',
      errors: ''
    };
    this.state = this.initialState;
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.retyped) {
      this.setState({
        retyped: '',
        errors: 'Passwords don\'t match'
      })
      return;
    } else {
      axios.post('/user/register', {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      })
        .then(res => {
          console.log(res.data);
          typeof res.data !== 'string' ?
            this.setState({errors: res.data}) :
            this.setState({...this.initialState});
        })
        .catch(err => console.log(err));
    }
  }

  showErrors(errors) {
    if (typeof errors === 'string') {
      return <ErrorMsg>{errors}</ErrorMsg>
    }

    return errors.map(err => {
      return <ErrorMsg>{err}</ErrorMsg>
    });
  }

  render() {
    return (
      <Page>
        <Features>
          <h2> Register to be able to: </h2>
          <ul>
            <li><i className="fas fa-check"></i>Like today's song and contribute to the leaderboard </li>
            <li><i className="fas fa-check"></i>Curate a favorites list </li>
            <li><i className="fas fa-check"></i>Access to new features </li>
          </ul>
        </Features>
        <form method="post">
          {this.fields.map(field => {
            return (
              <InputGroup>
                <label>{field.label}</label>
                <input
                  required
                  name={field.name}
                  type={field.type}
                  value={this.state[field.name]}
                  onChange={this.handleInputChange}
                />
              </InputGroup>
            )
          })}
          {this.showErrors(this.state.errors)}
          <Submit onClick={this.handleSubmit} type="submit">Register</Submit>
        </form>
      </Page>
    )
  }
}

export default Register;