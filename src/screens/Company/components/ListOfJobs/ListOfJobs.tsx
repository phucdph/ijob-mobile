import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ConnectedJobItem from '../../../NewFeed/components/ConnectedJobItem';
import { Divider } from 'react-native-elements';

interface IProps {
  id: string;
  data: string[];
  onLoad: (req: any) => void;
}

class ListOfJobs extends Component<IProps> {
  componentDidMount(): void {
    const { onLoad, id } = this.props;
    onLoad({ companyId: id });
  }

  renderItem = ({ item }: { item: string }) => {
    return <ConnectedJobItem id={item} showAvatar={false} />;
  };

  render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          scrollEnabled={false}
          maxToRenderPerBatch={10}
          ItemSeparatorComponent={Divider}
          data={data}
          keyExtractor={(item: string) => item}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default ListOfJobs;
