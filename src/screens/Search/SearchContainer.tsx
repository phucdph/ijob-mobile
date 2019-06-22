import React, { Component } from 'react';
import Search from './Search';
import { NavigationInjectedProps } from 'react-navigation';
import { ISearchHistory } from './services/typings';
import { createSearchHistory } from './components/SearchHistory/actions';
import { connect } from 'react-redux';

interface IProps extends NavigationInjectedProps {
  dispatchCreateSearchHistory: (req: ISearchHistory) => void,
};

class SearchContainer extends Component<IProps> {
  static navigationOptions = Search.navigationOptions;

  render() {
    const {dispatchCreateSearchHistory, navigation } = this.props;
    return (
     <Search onCreateHistory={dispatchCreateSearchHistory} navigation={navigation}/>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchCreateSearchHistory: (req: ISearchHistory) =>
      dispatch(createSearchHistory(req)),
  };
};

export default connect(null, mapDispatchToProps)(SearchContainer);
