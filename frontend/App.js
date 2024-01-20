import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import { LogBox } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

//Context API
import Auth from './Context/store/Auth';

// Navigators
import Main from './Navigators/Main';

//Screens
import HeaderBar from './shared/header';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <SafeAreaProvider>
        <Provider store={store}>
          <NativeBaseProvider theme={theme}>
            <NavigationContainer>
              <HeaderBar />
              <Main />
              <Toast ref={(ref) => React.forwardRef(ref)} />
            </NavigationContainer>
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    </Auth>

  );
}


// export default function App() {
//   return (
//     <NativeBaseConfigProvider>

//       <NavigationContainer>
//       <HeaderBar />
//       <Main />
//     </NavigationContainer>
//     </NativeBaseConfigProvider>


//   //  <NavigationContainer>
//   //    <NativeBaseProvider>
//   //     <SafeAreaProvider>

//   //           <HeaderBar />
//   //           <Main />

//   //     </SafeAreaProvider>
//   //   </NativeBaseProvider>
//   //  </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',

//   }
// });

const newColorTheme = {
  brand: {
    900: '#5B8DF6',
    800: '#ffffff',
    700: '#cccccc',
  },
};

const theme = extendTheme({
  colors: newColorTheme,
});
