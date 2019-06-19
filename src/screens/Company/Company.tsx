import React, { Component } from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  NavigationInjectedProps,
  NavigationScreenConfigProps,
  withNavigation
} from 'react-navigation';
import HeaderSearchBar from 'components/HeaderSearchBar';
import { Divider, Icon, Image, Button } from 'react-native-elements';
import { themeVariables } from 'themes/themeVariables';
import { ICompany, IUser } from './services/typings';
import WhiteSpace from 'components/base/WhiteSpace';
import Avatar from 'components/base/Avatar';
import { get, noop } from 'lodash';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { UserType } from '../../state';
import ScrollableTabbar from 'components/base/Tabbar/ScrollableTabbar';
import About from './screens/About/About';
import { ISkill } from '../NewFeed/services/typings';
import Tag from '../NewFeed/components/Tag';
import ListOfJobs from './components/ListOfJobs/ListOfJobs';
import ListOfJobsContainer from './components/ListOfJobs/ListOfJobsContainer';

interface IProps extends NavigationInjectedProps {
  data: ICompany;
  onLoad: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
  showActionSheetWithOptions?: (req: any) => void;
  userType: UserType;
  onFollow: () => void;
  onUnFollow: () => void;
  id: string;
}

interface IState {
  tabIndex: number;
}

// @ts-ignore
@connectActionSheet
class Company extends Component<IProps, IState> {
  static defaultProps = {
    isLoading: false,
    isRefreshing: false,
    showActionSheetWithOptions: noop
  };

  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const placeholder = navigation.getParam('placeholder', '');
    return {
      headerRight: null,
      headerLeft: null,
      headerTitle: (
        <HeaderSearchBar
          placeholder={placeholder || 'Search'}
          backButton={true}
        />
      )
    };
  };

  tabs = [
    {
      title: 'About',
      component: About
    },
    {
      title: 'Jobs',
      component: () => <ListOfJobsContainer id={this.props.id}/>,
    }
  ];

  tabComponents = {};

  constructor(props: IProps) {
    super(props);
    this.state = {
      tabIndex: 0
    };
    this.tabComponents = this.tabs.reduce(
      (previousValue: any, currentValue: any, currentIndex: number) => {
        previousValue[currentIndex] = currentValue.component || View;
        return previousValue;
      },
      {}
    );
  }

  handleTabChange = (tabIndex: number) => {
    this.setState({ tabIndex });
  };

  componentDidMount(): void {
    const { onLoad, data, navigation } = this.props;
    const { name } = data;
    navigation.setParams({
      placeholder: name
    });
      onLoad();
  }

  handleFollowPress = () => {
    const { onFollow, onUnFollow, data } = this.props;
    if (data.follow) {
      onUnFollow();
    } else {
      onFollow()
    }
  };

  renderCoverAndAvatar = () => {
    const { data, userType } = this.props;
    const { avatar, name, skills, follow } = data;
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Image
          source={require('../../../assets/default/default_cover.jpg')}
          resizeMode={'cover'}
          style={{ height: 200, width: themeVariables.window_width }}
        />
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: themeVariables.fill_base_color,
            alignItems: 'center',
            position: 'absolute',
            left:
              (themeVariables.window_width -
                themeVariables.profile_avatar_size) /
              2,
            top:
              themeVariables.profile_cover_size -
              themeVariables.profile_avatar_size / 2,
            borderRadius: 100,
            borderColor: 'white'
          }}
        >
          <View style={{ zIndex: 2 }}>
            <Avatar
              source={{
                uri: avatar ? avatar : undefined
              }}
              title={name[0]}
              size={themeVariables.profile_avatar_size}
              rounded={true}
              containerStyle={{
                borderWidth: 5,
                borderColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3
              }}
            />
          </View>
        </View>
        <View
          style={{
            zIndex: 1,
            // position: 'absolute',
            marginTop:
              themeVariables.profile_avatar_size / 2 +
              themeVariables.spacing_lg,
            flex: 1,
            alignItems: 'center'
          }}
        >
          <View style={{ paddingHorizontal: themeVariables.spacing_xl }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              {name}
            </Text>
            <WhiteSpace size={'lg'} />
            {
              userType === UserType.USER && <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                <TouchableOpacity onPress={this.handleFollowPress}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: themeVariables.primary_color,
                      backgroundColor: follow ? themeVariables.primary_color : 'white',
                      width: 150
                    }}
                  >
                    <Icon
                      name="ios-checkmark"
                      type="ionicon"
                      size={30}
                      color={follow ? 'white' : themeVariables.primary_color}
                    />
                    <WhiteSpace horizontal={true} />
                    <Text
                      style={{
                        fontSize: 17,
                        color: follow ? 'white' : themeVariables.primary_color
                      }}
                    >
                      {follow ? 'Following' : 'Follow'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
            <WhiteSpace size={'lg'}/>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {(skills || []).map((s: ISkill, i: number) => (
                <Tag
                  name={s.name.trim()}
                  key={`${s.id}-${i}`}
                  style={{
                    marginRight: themeVariables.spacing_sm,
                    marginVertical: themeVariables.spacing_xs
                  }}
                />
              ))}
            </View>
          </View>
        </View>
        <WhiteSpace size={'xl'} />
      </View>
    );
  };

  renderScrollableTabbar = () => {
    return (
      <ScrollableTabbar tabs={this.tabs} onChangeTab={this.handleTabChange} />
    );
  };

  renderTabView = () => {
    const { tabIndex } = this.state;
    const { data } = this.props;
    const TabComponent = (this.tabComponents as any)[tabIndex] as any;
    return <TabComponent company={data} />;
  };

  render() {
    const { onRefresh, isRefreshing = false } = this.props;
    return (
      <>
        <StatusBar barStyle={'light-content'} />
        <ScrollView
          style={{ backgroundColor: themeVariables.fill_base_color, flex: 1 }}
          keyboardShouldPersistTaps={'handled'}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          stickyHeaderIndices={[2]}
        >
          {this.renderCoverAndAvatar()}
          <Divider />
          {this.renderScrollableTabbar()}
          {this.renderTabView()}
        </ScrollView>
      </>
    );
  }
}

export default withNavigation(Company);
