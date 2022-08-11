import { registerRootComponent } from "expo";
import * as React from 'react';
import App from "./App";
import { Provider as StoreProvider } from "react-redux";
import store from "./stores";
import { Provider as PaperProvider } from "react-native-paper";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

/*const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow'
  }
};*/

const RNRedux = () => (
  <StoreProvider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </StoreProvider>
);

registerRootComponent(RNRedux);
