import React, { Component } from 'react';
// import FastImage, { FastImageProperties } from 'react-native-fast-image-expo';
import { View, Image, ImageProps } from 'react-native';

interface IProps extends ImageProps {
  size?: number;
}

class Avatar extends Component<IProps> {
  static defaultProps = {
    size: 50
  };

  render() {
    const { size = 50 } = this.props;
    // @ts-ignore
    return (
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3
        }}
      >
        <View
          style={{
            width: size,
            height: size,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: size / 2,
            overflow: 'hidden',
            backgroundColor: 'white'
          }}
        >
          <Image
            style={{
              width: null as any,
              height: size
            }}
            resizeMode={'contain'}
            {...this.props}
          />
        </View>
      </View>
    );
  }
}

export default Avatar;
