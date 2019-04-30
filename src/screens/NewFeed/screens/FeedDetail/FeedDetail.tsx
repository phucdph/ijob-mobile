import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import { Constants } from 'expo';
import { Button, Icon, ListItem } from 'react-native-elements';
import HeaderBackButton from 'components/HeaderBackButton';
import { themeVariables } from 'themes/themeVariables';
import Tag from '../../components/Tag';
import { ISkill } from '../../services/typings';
import WhiteSpace from 'components/base/WhiteSpace';

class FeedDetail extends Component {
  static navigationOptions = {
    header: (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          backgroundColor: 'white'
        }}
      />
    )
  };

  renderInfo = () => {
    return (
      <View style={{ padding: themeVariables.spacing_md }}>
        <ListItem
          leftElement={
            <View style={{ width: 25, alignItems: 'center' }}>
              <Icon name={'ios-card'} type={'ionicon'} />
            </View>
          }
          containerStyle={{ padding: themeVariables.spacing_xs }}
          title={'500 - 1000 USD'}
          titleStyle={{ fontSize: 14 }}
        />
        <ListItem
          leftElement={
            <View style={{ width: 25, alignItems: 'center' }}>
              <Icon name={'ios-pin'} type={'ionicon'} />
            </View>
          }
          containerStyle={{ padding: themeVariables.spacing_xs }}
          title={'Ho Chi Minh'}
          titleStyle={{ fontSize: 14 }}
        />
        <WhiteSpace size={'sm'} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {[
            { id: '1', name: 'Javascript' },
            { id: '2', name: 'React Native' },
            { id: '3', name: 'Angular' },
            { id: '4', name: 'Product Backlog' }
          ].map((s: ISkill, i: number) => (
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
    );
  };

  renderRequirementSection = () => {
    const data = [
      'You’re smart and can pass our test rounds',
      '2 + years of experience working with one of the following: C#, C++',
      'Awesome with Cocos2Dx or Unity',
      'You’ve done at least 3 gaming projects in your last 3 years',
      'Know how to write native plugin (Java/Object C) is an advantage',
      'You are superb in using Github (or Gitlab)',
      'Understanding of OO programming and design patterns',
      'Can take ownership of, and set the direction for feature development'
    ];
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Your Skills and Experience
        </Text>
        <View style={{ padding: themeVariables.spacing_md }}>
          {data.map((item: string, index: number) => (
            <ListItem
              key={index}
              title={item}
              leftElement={
                <View style={{ width: 10, alignItems: 'center' }}>
                  <Icon name={'circle'} type={'font-awesome'} size={8} />
                </View>
              }
              titleStyle={{ fontSize: 14 }}
              containerStyle={{ padding: themeVariables.spacing_xs }}
            />
          ))}
        </View>
      </View>
    );
  };

  renderBenefitSection = () => {
    const data = [
      'Great facility to work. You will have a MacBook and extra high definition screens',
      'Premium health insurance package and annual medical check-up',
      'Sponsorship for training courses',
      'Interesting activities: gym/fitness, yoga club at work, English club, corporate social responsibility events...',
      'Attractive signing bonus for important positions',
      'With regular discussions with the CEO, founders and executives of the company, you will have a lot of opportunities to learn from experts in their fields',
      'Annual bonus and project bonus',
      'International opportunity to expose and grow'
    ];
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Why You'll Love Working Here
        </Text>
        <View style={{ padding: themeVariables.spacing_md }}>
          {data.map((item: string, index: number) => (
            <ListItem
              key={index}
              title={item}
              leftElement={
                <View style={{ width: 10, alignItems: 'center' }}>
                  <Icon name={'circle'} type={'font-awesome'} size={8} />
                </View>
              }
              titleStyle={{ fontSize: 14 }}
              containerStyle={{ padding: themeVariables.spacing_xs }}
            />
          ))}
        </View>
      </View>
    );
  };

  handleMenuPress = () => {
    console.log('menu press');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingLeft: themeVariables.spacing_sm
            }}
          >
            <HeaderBackButton color={'black'} />
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <ListItem
                leftAvatar={{
                  rounded: true,
                  title: 'K'
                }}
                title={'KMS Technology'}
                subtitle={'Ho Chi Minh'}
                containerStyle={{
                  alignItems: 'flex-start',
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              minWidth: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={'ios-more'} type={'ionicon'} onPress={this.handleMenuPress}/>
          </View>
        </View>
        <ScrollView style={{ padding: themeVariables.spacing_lg }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Senior ReactJS Developer
          </Text>
          {this.renderInfo()}
          <WhiteSpace size={'md'} />
          {this.renderRequirementSection()}
          <WhiteSpace size={'md'} />
          {this.renderBenefitSection()}
          <WhiteSpace size={'lg'} />
          <Button
            title={'Apply Now'}
            buttonStyle={{ backgroundColor: themeVariables.accent_color }}
          />
          <WhiteSpace size={'lg'} />
          <WhiteSpace size={'xl'} />
        </ScrollView>
      </View>
    );
  }
}

export default FeedDetail;
