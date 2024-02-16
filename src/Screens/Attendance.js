import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import UserImage from '../Assets/userImage.png';
import Icon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import IonICons from 'react-native-vector-icons/Ionicons';
import SimpleLineICon from 'react-native-vector-icons/SimpleLineIcons';
import userimage from '../Assets/userimage1.jpg';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useDispatch , useSelector} from 'react-redux';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';
import {UserLogedIn , userLogOut} from "../Components/redux/Slices/authSlice"

const Attendance = ({navigation}) => {
  const [userImage, setUserImage] = useState(null);
  const [userDataLocal, setuserDataLocalLocal] = useState(null);
  const [stdCheckIn, setStdCheckIn] = useState(false);
  const [shownCamera, setShownCamera] = useState(false);
  const [stdPhotoPath, setStdPhotoPath] = useState();
  const {hasPermission, requestPermission} = useCameraPermission();
  const [switchCamera, setSwitchCamera] = useState(true);
  const [cameraFlash, setCameraFlash] = useState(true);
  const[stdPic, setStdPic] = useState()
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [course, setCourse] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNum] = useState();
  const [showPassword , setShowPassword] = useState(false)
  const[stdId , setStdId] = useState()  
  const[studentdata,setStudentData] = useState()

  const device = useCameraDevice(switchCamera ? 'front' : 'back');
  const camera = useRef(null);
  const route = useRoute()
  const id = route.params?.id
  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.auth);

  // console.log('userData------>' , userData.id)

  useEffect(()=>{
    console.log('userData.id------->', userData?.id)
    setStdId(userData?.id)
  },[userData])



  if (device == null) return <NoCameraDeviceError />;
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  useEffect(()=>{
    if (stdId) {
      axios({
        method: "get",
        url: `http://192.168.100.67:3000/api/students/getstudent/${stdId}`,
      })
        .then((res) => {
          // console.log('respose studernt data 83',res.data.studentData)
          setStdPic(res.data.studentData.Image)
          setStudentData(res.data.studentData);
          setFirstName(res.data.studentData.firstName);
          setlastName(res.data.studentData.lastName);
          setCourse(res.data.studentData.course);
          setEmail(res.data.studentData.email);
          setPassword(res.data.studentData.password);
          setPhoneNum(res.data.studentData.phoneNumber);
        })
        .catch((err) => console.log(err.response));
    }

  },[stdId])
  const stdCheckOutAttendance = () => {
    setStdCheckIn(!stdCheckIn);
  };
  const stdCheckInAttendance = async () => {
    setStdCheckIn(!stdCheckIn);
   const res = await dispatch(UserLogedIn())
   console.log('dispatch res --->' ,res)
  };

  const CaptureStudentPicture = async () => {
    const photo = await camera.current.takePhoto({
      flash: cameraFlash ? 'on' : 'off',
    });
    setUserImage(photo.path);
    setStdPhotoPath(photo.path);
    setShownCamera(!shownCamera);
  };


  const UserLogOut = ()=>{
    console.log('user log out h')
    dispatch(userLogOut())
    navigation.navigate('login')

  }
  return (
    <ScrollView
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
            {/* style={styles.logOutIcon} */}
      <TouchableOpacity style={styles.logOutBtn}>
        <Text style={{color : 'red' , fontWeight : 'bold' , marginLeft : 5}}>
        <SimpleLineICon
            style={styles.logOutIcon}
            name="logout"
            size={28}
            color="red"
            onPress={UserLogOut}

          />
    
        </Text>
       
      </TouchableOpacity>
      
      <View style={styles.imageContainer}>
        <Image
          style={styles.userimage}
          source={userImage ? {uri: `file://:${userImage}`} : stdPic ? {uri: `${stdPic}`} : UserImage}
        />
        {(!userImage || !stdPic)&& (
          <Icon
            style={styles.cameraIcon}
            name="camera"
            size={30}
            color="#fff"
            onPress={() => {
              // navigation.navigate('cameraScreen')
              setShownCamera(!shownCamera);
            }}
          />
        )}
      </View>

      {shownCamera && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 555,
          }}>
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          <MatIcon
            style={styles.switchCamIcon}
            name="cameraswitch"
            size={30}
            color="#fff"
            onPress={() => {
              setSwitchCamera(!switchCamera);
            }}
          />

          {cameraFlash ? (
            <IonICons
              style={styles.flashIcon}
              name="flash"
              size={30}
              color="#fff"
              onPress={() => {
                setCameraFlash(!cameraFlash);
              }}
            />
          ) : (
            <IonICons
              style={styles.flashIcon}
              name="flash-off"
              size={30}
              color="#fff"
              onPress={() => {
                setCameraFlash(!cameraFlash);
              }}
            />
          )}

          <TouchableOpacity
            onPress={CaptureStudentPicture}
            style={styles.cameraBtn}></TouchableOpacity>
        </View>
      )}
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 50,
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#0866ad'}
            placeholder="Name"
            style={styles.attenInput}
            value={firstName}
            editable={false}
          />
          <Icon
            style={styles.inputIcon}
            name="user"
            size={30}
            color="#0866ad"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#0866ad'}
            placeholder="Email"
            style={styles.attenInput}
            value={email}
            editable={false}

          />
          <FontistoIcon
            style={styles.inputIcon}
            name="email"
            size={30}
            color="#0866ad"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#0866ad'}
            placeholder="Phone"
            style={styles.attenInput}
            value={phoneNumber}
            editable={false}


          />
          <Icon
            style={styles.inputIcon}
            name="phone"
            size={30}
            color="#0866ad"
          />
        </View>
        <View style={styles.inputContainer}>
        <IonICons
            style={styles.eyeIcon}
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="#000"
            onPress ={()=> setShowPassword(!showPassword)}
          />
          <TextInput
            placeholderTextColor={'#0866ad'}
            placeholder="Password"
            style={styles.attenInput}
            value={password}
            editable={false}
            secureTextEntry={showPassword ? false : true}


          />
          <FontistoIcon
            style={styles.inputIcon}
            name="locked"
            size={30}
            color="#0866ad"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={stdCheckIn ? stdCheckOutAttendance : stdCheckInAttendance}
            style={stdCheckIn ? styles.checkOutBTn : styles.CheckedInBtn}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
              {stdCheckIn ? 'Checked Out' : 'Checked In '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  userimage: {
    height: 150,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 75,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  cameraIcon: {
    position: 'absolute',
    top: 105,
    zIndex: 9999,
    left: 160,
  },
  attenInput: {
    height: 60,
    width: '80%',
    backgroundColor: '#efeded',
    paddingLeft: 60,
    

    marginTop: 10,
    color : '#000'
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '15%',
  },
  eyeIcon : {
    position: 'absolute',
    right: '13%',
    top : 30,
    zIndex : 222

  },
  CheckedInBtn: {
    height: 70,
    width: 150,
    backgroundColor: '#0866ad',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 50,
  },
  checkOutBTn: {
    height: 70,
    width: 150,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 50,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  cameraBtn: {
    height: 100,
    width: 100,
    backgroundColor: '#0866ad',
    zIndex: 888,
    position: 'absolute',
    borderRadius: 50,
    bottom: 5,
    left: 130,
    borderColor: '#efeded',
    borderWidth: 10,
  },
  switchCamIcon: {
    zIndex: 888,
    position: 'absolute',
    right: 10,
    top: 30,
    fontSize: 30,
  },
  flashIcon: {
    zIndex: 888,
    position: 'absolute',
    right: 13,
    top: 90,
    fontSize: 30,
  },
  logOutBtn: {
    height : 40,
    width : 110,
    // backgroundColor : 'red',
    justifyContent : 'center',
    alignItems : 'center',
  },
  logOutIcon : {
    position: 'absolute',
    left: '5%',
    top : 20,
    zIndex : 200,
    marginRight : 10

  },
  logOutBtn : {
    position: 'absolute',
    left: '5%',
    top : 20,
    zIndex : 200,
    
  }
});
export default Attendance;
