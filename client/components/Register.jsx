import React from 'react';
import axios from 'axios';

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
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      retyped: '',
      error: ''
    }
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
        error: 'Passwords don\'t match'
      })
      return;
    } else {
      axios.post('/user/register', {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      })
        .then(user => console.log(user))
        .catch(err => console.log(err));
    }
  }

  render() {

    return (
      <form method="post">
        {this.fields.map(field => {
          return (
            <div>
              <label>{field.label}</label>
              <input
                required
                name={field.name}
                type={field.type}
                value={this.state[field.name]}
                onChange={this.handleInputChange}
              />
            </div>
          )
        })}
        <button onClick={this.handleSubmit} type="submit">Register</button>
        <div>{this.state.error}</div>
      </form>
    )
  }
}

export default Register;
//<div class="invalid-feedback">{field.error}</div>