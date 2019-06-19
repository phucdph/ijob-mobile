import React, { Component } from 'react';
import { View, Text } from 'react-native';
import HeaderTitle from 'components/HeaderTitle';
import HeaderButton from 'components/HeaderButton';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps
} from 'react-navigation';
import { noop, get } from 'lodash';
import navigationService from 'services/navigationService';
import WhiteSpace from 'components/base/WhiteSpace';
import { themeVariables } from 'themes/themeVariables';
import Button from 'components/base/Button';
import FloatingLabel from 'components/FloatingLabel';
import { ILocation } from 'components/Locations/services/typings';
import { IUser } from '../Profile/services/typings';
import { ISkill } from '../NewFeed/services/typings';

interface IProps extends NavigationInjectedProps {
  onUpdate: (req: Partial<IUser>) => void;
  skills: ISkill[];
}

interface IState {
  location: ILocation;
}

class TourGuide extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const handleSkipPress = navigation.getParam('onSkipPress', noop);
    return {
      headerRight: <HeaderButton name={'Skip'} onPress={handleSkipPress} />,
      headerTitle: <HeaderTitle title={'Update your profile'} />,
      headerLeft: <View />
    };
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      location: null as any
    };
  }

  componentDidMount(): void {
    const { navigation } = this.props;
    navigation.setParams({
      onSkipPress: this.handleSkipPress
    });
  }

  handleSkipPress = () => {
    navigationService.navigate({
      routeName: 'NewFeed'
    });
  };

  handleSelectLocation = (location: ILocation) => {
    this.setState({ location });
    const { onUpdate } = this.props;
    onUpdate({ location });
  };

  handleLocationInputPress = () => {
    this.props.navigation.navigate({
      routeName: 'LocationSelectModal',
      params: {
        onSelectLocation: this.handleSelectLocation
      }
    });
  };

  handleEditSkillPress = () => {
    navigationService.navigate({ routeName: 'ListOfSkillModal' });
  };

  render() {
    const location = get(this.state, 'location.name', '');
    const skills = ((get(this.props, 'skills', []) || []) as any)
      .map((s: any) => s.name)
      .join(', ');
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: themeVariables.spacing_lg
          }}
        >
          <WhiteSpace size={'lg'} />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            One more step
          </Text>
          <WhiteSpace size={'lg'} />
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Complete your profile and we will give you the job that you want.
          </Text>
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <View style={{ width: '100%' }}>
            <FloatingLabel
              label={'Location'}
              value={location}
              onPress={this.handleLocationInputPress}
            />
            <WhiteSpace size={'lg'} />
            <FloatingLabel
              label={'Skill'}
              value={skills}
              onPress={this.handleEditSkillPress}
            />
          </View>
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'lg'} />
          <Button
            disabled={!!location && !!skills}
            title="Let's start"
            type="solid"
            style={{ width: '100%' }}
            containerStyle={{ width: '100%' }}
            onPress={this.handleSkipPress}
          />
        </View>
      </View>
    );
  }
}

export default TourGuide;
