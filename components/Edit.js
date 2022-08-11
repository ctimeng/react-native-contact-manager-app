import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  LogBox
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import db from "../Firebase";
import { FIREBASE_COLLECTION_PEOPLES, DEFAULT_PEOPLE } from "../global";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import CustomMenu from "./CustomMenu";
import ActionSheet from "react-native-actionsheet";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TextInput } from 'react-native-paper';

const Edit = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
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
          // Title of the Bottom Sheet
          title={'ACTIONS'}
          // Options Array to show in bottom sheet
          options={optionArray}
          // Define cancel button index in the option array
          // This will take the cancel option in bottom
          // and will highlight it
          cancelButtonIndex={3}
          // Highlight any specific option
          destructiveButtonIndex={0}
          onPress={(index) => {
            // Clicking on the option will give you alert
            alert(optionArray[index]);
          }}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
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
