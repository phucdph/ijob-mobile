import React, { Component } from 'react';
import { Camera as EXPCamera, Constants, Permissions } from 'expo';
import { TouchableOpacity, View, Text } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { Icon } from 'react-native-elements';
import navigationService from 'services/navigationService';
import { isIOS } from 'utils/platform';
interface IProps {}

interface IState {
  hasCameraPermission: boolean;
  type: string;
}
class Camera extends Component<IProps, IState> {
  static navigationOptions = {
    header: null
  };
  camera: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      type: EXPCamera.Constants.Type.back
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleRevertCamera = () => {
    this.setState({
      type:
        this.state.type === EXPCamera.Constants.Type.back
          ? EXPCamera.Constants.Type.front
          : EXPCamera.Constants.Type.back
    });
  };

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
    }
  };

  render() {
    const { type } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <EXPCamera
          ref={(ref: any) => {
            this.camera = ref;
          }}
          style={{ flex: 1 }}
          type={type}
          ratio={'1:1'}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                paddingTop: Constants.statusBarHeight,
                height: 80,
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.25)'
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: themeVariables.spacing_lg,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Icon
                  name={'ios-close'}
                  type={'ionicon'}
                  size={45}
                  color={'white'}
                  onPress={navigationService.goBack}
                  Component={TouchableOpacity}
                />
                <Icon
                  name={'ios-reverse-camera'}
                  type={'ionicon'}
                  size={45}
                  color={'white'}
                  onPress={this.handleRevertCamera}
                  Component={TouchableOpacity}
                />
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Icon
                name={'ios-radio-button-on'}
                color={'white'}
                type={'ionicon'}
                size={80}
                onPress={this.snap}
                Component={TouchableOpacity}
              />
              <View style={{ height: '5%' }} />
            </View>
          </View>
        </EXPCamera>
      </View>
    );
  }
}

export default Camera;
