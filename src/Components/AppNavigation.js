import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import AttendanceScreen from '../Screens/Attendance';
import Camera from './MyCamera';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
function AppNavigation({navigation}) {
  const [token, setToken] = useState();
  const {userData} = useSelector(state => state.auth);

  useEffect(() => {
    if (userData) {
      setToken(userData?.token);
    }
  }, [userData]);

  const commonOptions = {
    title: 'SMIT ATTENDANCE APP',
    headerStyle: {
      backgroundColor: '#116eb2',
      justifyContent: 'center',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent: 'center',
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'attendance' : 'login'}>
        {!token ? (
          <Stack.Screen
            options={{...commonOptions}}
            name="login"
            component={Login}
          />
        ) : (
          <>
            <Stack.Screen
              options={{...commonOptions, title: 'Attendance App'}}
              name="attendance"
              component={AttendanceScreen}
            />
            <Stack.Screen
              options={{...commonOptions, title: 'Camera'}}
              name="cameraScreen"
              component={Camera}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
