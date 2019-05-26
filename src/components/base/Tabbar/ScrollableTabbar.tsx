import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { themeVariables } from 'themes/themeVariables';
import { noop } from 'lodash';
// @ts-ignore
import Touchable from 'react-native-platform-touchable';

interface ITab {
  title: string;
}

interface IProps {
  initialIndex?: number;
  tabs: ITab[];
  onChangeTab?: (index: number) => void;
}

interface IState {
  tabIndex: number;
}

class ScrollableTabbar extends Component<IProps, IState> {
  static defaultProps = {
    initialIndex: 0,
    onChangeTab: noop
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      tabIndex: props.initialIndex || 0
    };
  }

  handleTabChange = (tabIndex: number) => {
    if (tabIndex === this.state.tabIndex) {
      return;
    }
    const { onChangeTab = noop } = this.props;
    onChangeTab(tabIndex);
    this.setState({ tabIndex });
  };

  renderTab = (title: string, index: number) => {
    const selected = index === this.state.tabIndex;
    return (
      <Touchable disabled={selected} onPress={() => this.handleTabChange(index)} key={index}>
        <View
          style={{
            width: Dimensions.get('window').width / this.props.tabs.length,
            borderBottomWidth: selected ? 3 : 0,
            paddingBottom: selected ? 0 : 3,
            paddingTop: 3,
            borderBottomColor: themeVariables.primary_color,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Text
            style={{
              color: selected
                ? themeVariables.primary_color
                : themeVariables.primary_text_color,
              fontSize: 16,
            }}
          >
            {title}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const { tabs } = this.props;
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{
          height: 50,
          flexShrink: undefined,
          flexGrow: undefined,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: themeVariables.fill_base_color,
        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        {tabs.map((tab: ITab, index: number) =>
          this.renderTab(tab.title, index)
        )}
      </ScrollView>
    );
  }
}

export default ScrollableTabbar;
