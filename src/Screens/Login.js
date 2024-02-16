import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import SmitLogo from '../Assets/smitlogo.jpg';
import Icon from 'react-native-vector-icons/Fontisto';
import {UserLogedIn} from '../Components/redux/Slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import IonICons from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userDataLocal, setUserDataLocal] = useState();
  const [showPassword , setShowPassword] = useState(false)

  const {userData} = useSelector(state => state.auth);
  useEffect(() => {
    console.log('userdata---- 29>',userData)
    if (userData) {
      setUserDataLocal(userData);
      console.log('userdataLocal----32>' , userDataLocal)
    }
  },[userData]);

  const dispatch = useDispatch();
  const showToastWithGravityAndOffset = (title) => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      150,
    );
  };
  const userLogedIn = async () => {
    // try {
    try {
      const userDetails = {
        email,
        password,
      };
      const res = await dispatch(UserLogedIn(userDetails));
      if(res){
        showToastWithGravityAndOffset('User Login Successfuly')
        navigation.navigate('attendance', {id : res.payload.id})
      }
    } catch (error) {
        showToastWithGravityAndOffset('User Not Found ')

    }

    };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        
        backgroundColor: 'white',
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image style={styles.logo} source={SmitLogo} />

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
          <IonICons
            style={styles.eyeIcon}
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#000"
            onPress ={()=> setShowPassword(!showPassword)}
          />
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor={'#0866ad'}
              style={styles.textInput}
              onChangeText={setPassword}
            secureTextEntry={showPassword ? false : true}

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
  eyeIcon : {
    position : 'absolute',
    zIndex : 222,
    top : 55,
    right : 0
  }
});

export default Login;
