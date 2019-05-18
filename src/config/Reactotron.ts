import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

export default (Reactotron as any)
  .configure()
  .use(reactotronRedux())
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /logs/
    }
  })
  .connect();
