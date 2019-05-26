import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  withNavigation
} from 'react-navigation';
import { themeVariables } from 'themes/themeVariables';
import HeaderTitle from 'components/HeaderTitle';
import HeaderButton from 'components/HeaderButton';
import { ISkill } from 'components/Search/SearchSkill/services/typings';
import WhiteSpace from 'components/base/WhiteSpace';
import navigationService from 'services/navigationService';
import { IUser } from '../../services/typings';
import { noop } from 'lodash';
import Spinner from 'components/base/Spinner';
import { updateUserProfileSuccess } from '../../actions';

interface IProps extends NavigationInjectedProps {
  skills: ISkill[];
  isLoading?: boolean;
  onUpdate: (req: Partial<IUser>) => void;
  action?: string;
}

interface IState {
  skills: ISkill[];
}

class ListOfSkill extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const handleUpdate = navigation.getParam('onUpdate', noop);
    return {
      headerLeft: (
        <HeaderButton name={'Cancel'} onPress={navigationService.goBack} />
      ),
      headerTitle: <HeaderTitle title={'Skill'} />,
      headerRight: <HeaderButton name={'Save'} onPress={handleUpdate} />
    };
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      skills: props.skills || []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onUpdate: this.handleUpdate
    });
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { action } = this.props;
    if (prevProps.action !== action) {
      if (updateUserProfileSuccess.is(action)) { this.props.navigation.goBack(); }
    }
  }

  renderSkillItem = ({ item, index }: { item: ISkill; index: number }) => {
    const { name } = item;
    return (
      <ListItem
        title={name}
        rightIcon={{
          name: 'ios-close',
          type: 'ionicon',
          size: 35,
          color: themeVariables.accent_color,
          onPress: () => this.handleDeleteSkill(index)
        }}
        containerStyle={{ paddingVertical: 0 }}
      />
    );
  };

  handleUpdate = () => {
    const { onUpdate } = this.props;
    const { skills } = this.state;
    onUpdate({ skills });
  };

  handleAddSkillPress = () => {
    const { skills } = this.state;
    navigationService.navigate({
      routeName: 'SearchSkillSelectModal',
      params: {
        value: skills,
        onSelectSkill: this.handleAddSkill
      }
    });
  };

  handleAddSkill = (skill: ISkill) => {
    this.setState((prevState: IState) => ({
      skills: [...prevState.skills, skill]
    }));
  };

  handleDeleteSkill = (index: number) => {
    this.setState((prevState: IState) => ({
      skills: prevState.skills.filter((_: any, i: number) => index !== i)
    }));
  };

  renderFooterComponent = () => {
    return (
      <TouchableOpacity onPress={this.handleAddSkillPress}>
        <View
          style={{
            paddingHorizontal: 17,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: themeVariables.spacing_md
          }}
        >
          <Icon
            name={'ios-add'}
            type={'ionicon'}
            size={30}
            containerStyle={{ paddingRight: themeVariables.spacing_md }}
            color={themeVariables.secondary_text_color}
          />
          <Text
            style={{ fontSize: 17, color: themeVariables.secondary_text_color }}
          >
            Add more skill
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { skills } = this.state;
    const { isLoading } = this.props;
    return (
      <Spinner isModal={true} loading={isLoading} overlay={0.3}>
          <FlatList
            data={skills}
            renderItem={this.renderSkillItem}
            keyExtractor={(item: ISkill, index: number) =>
              `${item.id}-${index}`
            }
            ItemSeparatorComponent={WhiteSpace}
            ListFooterComponent={this.renderFooterComponent}
          />
      </Spinner>
    );
  }
}

export default withNavigation(ListOfSkill);
