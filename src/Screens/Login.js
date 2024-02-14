import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid
} from 'react-native';
import SmitLogo from '../Assets/smitlogo.jpg';
import Icon from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const[token ,setToken] = useState()
  const [apiRes, setApiRes] = useState();


  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'User Login Successfuly',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      150,
    );
  };

  useEffect(()=>{
    const checkUserToken =async ()=>{
      const token = await AsyncStorage.getItem('token')
      setToken(token)
    }
    checkUserToken()
  },[])
  const userLogedIn = async () => {
    try {
      const userDetails = {
        email,
        password,
      };
      // console.log(userDetails);
      axios({
        method: "post",
        url: "http://192.168.100.67:3000/api/students/login",
        data: {
          ...userDetails,
        },
      })
        .then((res) => {
          console.log(res.data);
          // ToastAndroid.show('Student Login Successfuly', ToastAndroid.LONG);
          showToastWithGravityAndOffset()
         navigation.navigate('attendance', {id : res.data.id})
        })
        .catch((err) => console.log(err));
      navigation.navigate('attendance');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{flex: 1, alignItems : 'center'}}>
        <Image style={styles.logo} source={SmitLogo} />

        {/* <Text style={styles.loginHead}>Login</Text> */}
        <View>
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor={'#0866ad'}
              style={styles.textInput}
              onChangeText={setEmail}
            />
            <Icon
              style={styles.emailIcon}
              name="email"
              size={30}
              color="#0866ad"
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor={'#0866ad'}
              style={styles.textInput}
              onChangeText={setPassword}
            />
            <Icon
              style={styles.emailIcon}
              name="locked"
              size={30}
              color="#0866ad"
            />
          </View>
        </View>
        <TouchableOpacity onPress={userLogedIn} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 20,
    padding: 10,
  },
  loginBtn: {
    height: 60,
    width: 110,
    backgroundColor: '#0866ad',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 30,
  },
  loginHead: {
    fontSize: 30,
    color: '#8fc449',
    fontWeight: 'bold',
  },
  logo: {
    height: 200,
    width: 200,
    // marginTop : 5
  },
  textInput: {
    height: 50,
    width: 350,
    backgroundColor: '#efeded',
    marginTop: 40,
    color: 'black',
    fontSize: 17,
    paddingLeft: 70,
    position: 'relative',
  },
  emailIcon: {
    position: 'absolute',
    top: 47,
    left: 25,
  },
});

export default Login;
