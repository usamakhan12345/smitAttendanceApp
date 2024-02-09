import React, { useEffect , useRef} from 'react'
import { View  , StyleSheet} from 'react-native'
import { useCameraPermission , Camera , useCameraDevice } from 'react-native-vision-camera';
import { create } from 'react-test-renderer';

const MyCamera = () => {
    const {hasPermission, requestPermission} = useCameraPermission();
    const camera = useRef(null);
    const device = useCameraDevice('front');


  if (device == null) return <NoCameraDeviceError />;

    useEffect(()=>{
        if(!hasPermission){
            requestPermission()
        }
    },[])
  return (
    <View style={{flex : 1 }}>
       <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    height: '100%',
    width: '100%',
  },
})
export default MyCamera