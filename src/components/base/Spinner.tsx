import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface IProps {
  isModal?: boolean;
  loading?: boolean;
  overlay?: number;
}

class Spinner extends Component<IProps> {
  static defaultProps: Partial<IProps> = {
    isModal: false,
    loading: false,
    overlay: 0,
  };

  render() {
    const { isModal, loading, overlay } = this.props;
    if (!loading) return null;
    if (!isModal) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `rgba(0,0,0,${overlay} )`,
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            backgroundColor: `rgba(0,0,0,${overlay} )`,
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }
}

export default Spinner;
