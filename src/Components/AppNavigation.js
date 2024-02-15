import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import AttendanceScreen from '../Screens/Attendance';
import Camera from './MyCamera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
function AppNavigation({navigation}) {
  const [token, setToken] = useState();
  const [id, setId] = useState();
  const {userData} = useSelector(state => state.auth);
  console.log('userData in app navigation---->' , userData?.token)

  useEffect(()=>{
    if(userData){
      setToken(userData?.token)
    }
  },[userData])

  // useEffect(() => {
  //   const checkUserToken = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     const id = await AsyncStorage.getItem('id');
  //     console.log('token in app navigation --->', token);
  //     setId(id);
  //     setToken(token);
  //   };
  //   checkUserToken();
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     navigation.navigate('attendance', {id});
  //   }
  // }, [token]);

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
      <Stack.Navigator>
       {!token ? (
         
         <Stack.Screen
            options={{...commonOptions}}
            name="login"
            component={Login}
          />
         ) 
        : (
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
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
