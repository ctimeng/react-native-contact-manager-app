import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  LogBox,
  Platform,
  PermissionsAndroid
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import db from "../Firebase";
import { FIREBASE_COLLECTION_PEOPLES, DEFAULT_PEOPLE } from "../global";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
//import CustomMenu from "./customs/CustomMenu";
import ActionSheet from "react-native-actionsheet";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TextInput } from "react-native-paper";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
var RNFS = require('react-native-fs');

const Edit = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: DEFAULT_PEOPLE,
  });

  let actionSheet = useRef();
  var optionArray = ["ADD TO FAVOURITE", "ADD TO CONTACT", "DELETE", "CANCEL"];

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  const URL_REGEX =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  const getPeople = async () => {
    setLoading(true);
    const peopleDocRef = doc(db, FIREBASE_COLLECTION_PEOPLES, itemId);
    const docSnap = await getDoc(peopleDocRef);
    reset(docSnap.data());
    setLoading(false);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
 
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);
 
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  async function verifyFiles(filepath) {
    let exists = await RNFS.exists(filepath);
    console.log("exists", exists); // true or false
  }

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    getPeople();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => showActionSheet()}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const peopleDocRef = doc(db, FIREBASE_COLLECTION_PEOPLES, itemId);
    await updateDoc(peopleDocRef, data)
      .catch((err) => console.error(err))
      .then(() => {
        navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {loading && <ActivityIndicator size="large" />}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoFocus={true}
              />
            )}
            name="name"
          />
          {errors.name && <Text style={styles.error}>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="City"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="city"
          />
          {errors.city && <Text style={styles.error}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Company"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="company"
          />
          {errors.company && (
            <Text style={styles.error}>This is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Position"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="position"
          />
          {errors.position && (
            <Text style={styles.error}>This is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: { value: true, message: "This field is required" },
              pattern: { value: URL_REGEX, message: "Invalid URL" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Avatar"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="avatar"
          />
          {errors.avatar && (
            <Text style={styles.error}>{errors.avatar.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              pattern: { value: URL_REGEX, message: "Invalid URL." },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Facebook"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="social_networks.facebook"
          />
          {errors?.social_networks?.facebook && (
            <Text style={styles.error}>
              {errors.social_networks.facebook.message}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              pattern: URL_REGEX,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Twitter"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="social_networks.twitter"
          />
          {errors?.social_networks?.twitter && (
            <Text style={styles.error}>Invalid URL.</Text>
          )}

          <Controller
            control={control}
            rules={{
              pattern: URL_REGEX,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Instagram"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="social_networks.instagram"
          />
          {errors?.social_networks?.instagram && (
            <Text style={styles.error}>Invalid URL.</Text>
          )}

          <Controller
            control={control}
            rules={{
              pattern: { value: URL_REGEX, message: "Invalid URL." },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Linkedin"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="social_networks.linkedin"
          />
          {errors.linkedin && (
            <Text style={styles.error}>This is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              pattern: { value: URL_REGEX, message: "Invalid URL." },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Skype"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="social_networks.skype"
          />
          {errors.linkedin && (
            <Text style={styles.error}>This is required.</Text>
          )}
          <Button title="Save" onPress={handleSubmit(onSubmit)} />
          <ActionSheet
            ref={actionSheet}
            title={"ACTIONS"}
            options={optionArray}
            cancelButtonIndex={3}
            onPress={(index) => {
              // Clicking on the option will give you alert
              //alert(optionArray[index]);
                //captureImage('photo')
                //captureImage('video')
                //chooseFile('photo')
                //chooseFile('video')
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    margin: 10,
    height: 30,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
  error: {
    marginLeft: 10,
    color: "red",
  },
});

export default Edit;
