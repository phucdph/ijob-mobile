import * as React from 'react';
import { connect } from 'react-redux';
import { getLocations, refreshLocations } from './actions';
import {
  locationDataStateSelector,
  locationStateSelector
} from 'components/Locations/selectors';
import { ILocation } from 'components/Locations/services/typings';
import { IError } from 'services/models/Error';

interface IProps {
  dispatchGetLocations: () => void;
  dispatchRefreshLocations: () => void;
  locations: ILocation[];
  action: string;
  error: IError;
}

export default function locationContainer(Component: any) {
  class LocationsContainer extends React.Component<IProps> {

    loadLocations = () => {
      const { dispatchGetLocations, locations = [] } = this.props;
      if (!(locations && locations.length > 0 )) {
        dispatchGetLocations();
      }
    };

    isLoading = () => getLocations.is(this.props.action);

    isRefreshing = () => refreshLocations.is(this.props.action);

    render() {
      const {
        dispatchGetLocations,
        dispatchRefreshLocations,
        action,
        error,
        locations,
        ...rest
      } = this.props;
      return (
        <Component
          isLoading={this.isLoading()}
          isRefreshing={this.isRefreshing()}
          loadLocations={this.loadLocations}
          refreshLocations={dispatchRefreshLocations}
          action={action}
          error={error}
          locations={locations}
          {...rest}
        />
      );
    }
  }

  const mapStateToProps = (state: any) => {
    const locationState = locationStateSelector(state);
    return {
      action: locationState.action,
      error: locationState.error,
      locations: locationDataStateSelector(state)
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
    return {
      dispatchGetLocations: () => dispatch(getLocations()),
      dispatchRefreshLocations: () => dispatch(refreshLocations())
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocationsContainer as any);
}
