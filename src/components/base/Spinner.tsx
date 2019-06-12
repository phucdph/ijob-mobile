import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { default as RNSpinner } from 'react-native-loading-spinner-overlay';
import { themeVariables } from 'themes/themeVariables';

interface IProps {
  isModal?: boolean;
  loading?: boolean;
  overlay?: number;
}

class Spinner extends Component<IProps> {
  static defaultProps: Partial<IProps> = {
    isModal: false,
    loading: false,
    overlay: 0
  };

  render() {
    const { isModal, loading, overlay, children } = this.props;
    if (!loading) {
      return children;
    }
    if (!isModal) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeVariables.fill_base_color
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      );
    } else {
      return (
        <>
          <RNSpinner visible={loading} animation={'fade'}/>
          {children}
        </>
      );
    }
  }
}

export default Spinner;
