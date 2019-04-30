import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const themeVariables = {
  spacing_xs: 2,
  spacing_sm: 4,
  spacing_md: 8,
  spacing_lg: 16,
  spacing_xl: 24,
  primary_color: '#3F51B5',
  dark_primary_color: '#303F9F',
  light_primary_color: '#C5CAE9',
  light_text_color: '#FFFFFF',
  accent_color: '#E64A19',
  primary_text_color: '#212121',
  secondary_text_color: '#757575',
  fill_base_color: '#E9EBEE',
  window_height: height,
  window_width: width,
  profile_avatar_size: 150,
  profile_cover_size: 200,
};
