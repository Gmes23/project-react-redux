import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { userSignupRequest, isUserExists } from './actions';

import validateInput from '../../../server/middlewares/routes/shared/validation/signupvalidation';

import { Link } from 'react-router';

const ButtonBack = styled(Link)`
    position: absolute;
    height: 50px;
    padding-top: 1.5vh;
    width: 100px;
    text-align: center;
    border: 2px solid red;
    bottom: 2vh;
    margin: -.6vh;
`;

const SignUpPage = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: white;
`;

const RegisterInput = styled.input`
    border-bottom: 2px solid red;
    margin: 20px;
`;

const Form = styled.form`
    position: absolute;
    top: 30vh;
    left: 20vw;
`;

const Button = styled.button`
    background-color: red;
    color: white;
    width: 100px;
    height: 50px;
    margin: 10px;
    cursor: pointer;
`;

const AlertWrongInput = styled.div`
    color: red;
    position: relative;
    margin: 1%;
`;

const ButtonHolder = styled.div`

`;

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenname: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid){
            this.setState({ errors });
        }
        
        return isValid;
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if(val !== '') {
            this.props.isUserExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;
                if (res.data.user) {
                    errors[field] = 'There is a user with such ' + field;
                    invalid = true;
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                this.setState({ errors, invalid })
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.isValid()){
        this.setState({ errors: {}, isLoading: true });
        this.props.userSignupRequest(this.state).then(
          () => {
              browserHistory.push('/');
          },
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
        }
    }


    render() {
        const { errors } = this.state;

        return (
          <SignUpPage>
            <Form onSubmit={this.onSubmit}>
              <h1> Join Our Community </h1>
                <RegisterInput
                type="text"
                name="screenname"
                placeholder="username"
                value={this.state.screenname}
                onChange={this.onChange}
                onBlur={this.checkUserExists}
                />
                 {errors.screenname && <AlertWrongInput> { errors.screenname } </AlertWrongInput>}

                <RegisterInput
                type="eamil"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChange}
                />
                 {errors.email && <AlertWrongInput> { errors.email } </AlertWrongInput>}

                  <RegisterInput
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
                />
                 {errors.password && <AlertWrongInput> { errors.password } </AlertWrongInput>}

                  <RegisterInput
                type="password"
                name="passwordConfirmation"
                placeholder="confirm password"
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
                />
                  {errors.passwordConfirmation && <AlertWrongInput> { errors.passwordConfirmation } </AlertWrongInput>}
                
                <ButtonHolder>
                  <Button disabled={this.state.isLoading || this.state.invalid }> Register </Button>
                  <ButtonBack to='/'> Back </ButtonBack>
                </ButtonHolder>
            </Form> 
          </SignUpPage>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
}


export default connect((state) => { return {} }, { userSignupRequest } )(SignupForm);
















/*

import React from 'react';
import map from 'lodash/map';
import validateInput from '../../../server/middlewares/routes/shared/validation/signupvalidation';
import TextFieldGroup from 'components/common/TextFieldGroup';
import styled from 'styled-components';

const Form = styled.form`
  position: absolute;
  left: 40%;
  top: 30%;
`;

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.context.router.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render() {
    const { errors } = this.state;
  
    return (
      <Form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <TextFieldGroup
          error={errors.screenname}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.screenname}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />



        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;*/




 













































// Log in/signup Page
/*
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import styled from 'styled-components';

const Form = styled.form`
    position: absolute;
    top: 37%;
    left: 38%;
    height: 400px;
    width: 470px;
    // background-color: red;
`;

const TextFieldGroup = styled.input`
   border-bottom: 2px solid red;
   background-color: transparent;
   margin: 5px;
`;

const Button = styled.button`
   width: 100px;
   height: 50px;
   color: white;
   background-color: red;

`;


class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userscreenname: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('/api/users')
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} >
                <h1> Register </h1>
                <TextFieldGroup
                  type="text"
                  placeholder="username"
                  value={this.state.userscreenname}
                  onChange={this.onChange}
                  name="userscreenname"
                 />

                  <TextFieldGroup
                  type="text"
                  placeholder="password"
                  value={this.state.email}
                  onChange={this.onChange}
                  name="userscreenname"
                 />

                  <TextFieldGroup
                  type="text"
                  placeholder="email"
                  value={this.state.password}
                  onChange={this.onChange}
                  name="userscreenname"
                 />

                  <TextFieldGroup
                  type="text"
                  placeholder="email"
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                  name="userscreenname"
                 />

                 <Button> REGISTER </Button>

            </Form>
        )
    }
}


export function* loginSaga() {
  while(true) {
    const { user, pass } = yield take(LOGIN_REQUEST)
    try {
      let { data } = yield call(request.post, '/login', { user, pass });
      yield fork(loadUserData, data.uid);
      yield put({ type: LOGIN_SUCCESS, data });
    } catch(error) {
      yield put({ type: LOGIN_ERROR, error });
    }  
  }
}

export function* loadUserData(uid) {
  try {
    yield put({ type: USERDATA_REQUEST });
    let { data } = yield call(request.get, `/users/${uid}`);
    yield put({ type: USERDATA_SUCCESS, data });
  } catch(error) {
    yield put({ type: USERDATA_ERROR, error });
  }
}


export default SignupForm;*/
