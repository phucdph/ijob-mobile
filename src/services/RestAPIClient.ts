// tslint:disable-next-line: no-var-requires
import { AsyncStorage } from 'react-native';
import navigationService from 'services/navigationService';

const querystring = require('querystring');
const API_URL = 'http://35.240.162.218:3001';

class RestAPIClient {

  static async getToken() {
    try {
      const auth = JSON.parse(await AsyncStorage.getItem('@IJOB/user') as string);
      return auth.token;
    } catch (e) {
      return '';
    }
  }
  path: string;
  constructor(path: string) {
    this.path = path;
  }

  async request(contextPath: string, method: string, payload?: any) {
    try {
      let url = `${API_URL}/${this.path}${contextPath}`;
      if (method === 'GET' && payload) {
        url = `${url}?${querystring.stringify(payload || {})}`;
      }
      const options = {
        method,
        headers: {
          'token': await RestAPIClient.getToken(),
          'Content-Type': 'application/json'
        }
      } as any;
      if (method === 'POST' || method === 'PUT') {
        // tslint:disable-next-line: no-string-literal
        options['body'] = JSON.stringify(payload);
      }
      const res = await fetch(url, options);
      if (res.status > 201) {
        const json = await res.json();
        if (json.status === 'INVALID_TOKEN' || json.status === 'REQUIRE_TOKEN') {
          navigationService.navigate({ routeName: 'SignIn'});
        }
        throw json;
      }
      return await res.json();
    } catch (err) {
      /*eslint-disable */
      if (err.toString().includes('Failed to fetch')) {
        throw {
          status: 'UNKNOWN_ERROR'
        };
      } else {
        throw err;
      }
      /*eslint-enable */
    }
  }

  get = (contextPath: string, params?: object) =>
    this.request(contextPath, 'GET', params);

  post = (contextPath: string, body: object) =>
    this.request(contextPath, 'POST', body);

  put = (contextPath: string, body: object) =>
    this.request(contextPath, 'PUT', body);

  delete = (contextPath: string) => this.request(contextPath, 'DELETE');
}

export default RestAPIClient;
