import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Screens/Login"
import AttendanceScreen from "../Screens/Attendance"
import Camera from './MyCamera';

const Stack = createNativeStackNavigator();

function App() {

const  commonOptions={
    title: 'SMIT ATTENDANCE APP',
    headerStyle: {
      backgroundColor: '#116eb2',
      justifyContent : 'center'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent : 'center',
      
    },
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  options={{...commonOptions}} name="login" component={Login} />
        <Stack.Screen options={{...commonOptions , title : "Attendance App"}} name="attendance" component={AttendanceScreen} />
        <Stack.Screen options={{...commonOptions , title : "Camera"}} name="cameraScreen" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;