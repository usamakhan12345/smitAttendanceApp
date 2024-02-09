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
import userimage from '../Assets/userimage1.jpg';
import axios from 'axios';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';

const Attendance = ({navigation}) => {
  const [userImage, setUserImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [stdCheckIn, setStdCheckIn] = useState(false);
  const [shownCamera, setShownCamera] = useState(false);
  const [stdPhotoPath, setStdPhotoPath] = useState();
  const {hasPermission, requestPermission} = useCameraPermission();
  const [switchCamera, setSwitchCamera] = useState(true);
  const [cameraFlash, setCameraFlash] = useState(true);

  const camera = useRef(null);
  const device = useCameraDevice(switchCamera ? 'front' : 'back');

  // console.log('hasPermission-->', hasPermission);
  if (device == null) return <NoCameraDeviceError />;
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  const stdCheckOutAttendance = () => {
    console.log('Student CheckOut');
    setStdCheckIn(!stdCheckIn);
  };
  const stdCheckInAttendance = () => {
    console.log('Student Checked In');
    setStdCheckIn(!stdCheckIn);
  };

  const CaptureStudentPicture = async () => {
    console.log('student pic captured');
    const photo = await camera.current.takePhoto({
      flash: cameraFlash ? 'on' : 'off',
    });
    console.log('photo------->', photo);
    setUserImage(photo.path);
    setStdPhotoPath(photo.path);
    setShownCamera(!shownCamera);
  };

  return (
    <ScrollView
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.userimage}
          source={userImage ? {uri: `file://:${userImage}`} : UserImage}
        />
        {!userImage && (
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
          />
          <Icon
            style={styles.inputIcon}
            name="phone"
            size={30}
            color="#0866ad"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#0866ad'}
            placeholder="Password"
            style={styles.attenInput}
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
    // marginTop: '50%',
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
});
export default Attendance;
