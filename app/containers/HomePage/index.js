import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectListResults, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadListResults } from '../App/actions';
import { changeSearchValue } from './actions';
import { makeSelectSearchValue } from './selectors';

import ActionBar from 'components/MainActionContainer/homepage';



import styled from 'styled-components';

const SearchWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 30px;
  padding-bottom: 60px;
  height: 200px;
  display: flex;
  @media screen and (max-width: 360px) {
    width: 82%;
    position: absolute;
    top: -21px;
    right: 0px;
    height: 200px;
    padding-left: 4%;
    padding-right: 4%;
    padding-bottom: 60px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
`;

const InputSearch = styled.input`
  width: 90%;
  height: 100%;
  text-align: end;
  color: gray;
  padding-top: 45px;
  font-size: 2.8em;
  outline: 0;
  border-width: 0 0 2px 0;
  border-color: red;
  border-bottom: 2px solid red;
  font-family: district-pro, sans-serif;
  font-style: normal;
  font-weight: 100;
  margin-left: 10%;

  &:hover {
     background-color: #fff; 
  }

`;

const InputIcon = styled.div`
  float: right;
  height: 100%;
  margin-left: 5%;
  width: 11%;
  border-bottom: 2px solid red;
  padding-top: 40px;

  @media screen and (max-width: 360px) {
     padding-top: 60px;
  } 
`;

const Icon_eyeglass = styled.a`
  font-size: 3.5em;

  @media screen and (max-width: 360px) {
     font-size: 2.2em;
  }
`;




export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
 
  render() {
    const { loading, error, listresults } = this.props;
    const resultListProps = {
      loading,
      error,
      listresults,
    };

    return (
      <div>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Search upcoming concerts by your favorite Artist' },
          ]}
        />
        <ActionBar />
        <ReposList {...resultListProps} />
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  listresults: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  searchvalue: React.PropTypes.string,
  onChangeSearchValue: React.PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  listresults: makeSelectListResults(),
  searchvalue: makeSelectSearchValue(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(HomePage);



