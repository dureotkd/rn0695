import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, { networking, openInEditor } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure()
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .use(reactotronRedux())
  .use(networking())
  .use(openInEditor())
  .connect();

export default reactotron;
