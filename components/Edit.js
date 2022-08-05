import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import db from "../Firebase";
import { FIREBASE_COLLECTION_PEOPLES, DEFAULT_PEOPLE } from "../global";
import {
  getDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import CustomMenu from './CustomMenu'

const Edit = ({route, navigation }) => {

  const { itemId, otherParam } = route.params;
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: DEFAULT_PEOPLE
  });

  const URL_REGEX =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  const getPeople = async () => {
    setLoading(true)
    const peopleDocRef = doc(db, FIREBASE_COLLECTION_PEOPLES, itemId)
    const docSnap =  await getDoc(peopleDocRef);
    reset(docSnap.data())
    setLoading(false)
  } 

  useEffect(() => {
    getPeople()
    /*navigation.setOptions({
      headerRight: () => (
        <CustomMenu menutext="Menu"
        menustyle={{marginRight: 14}}
        textStyle={{color: 'white'}}
        navigation={navigation}
        route={route}
        isIcon={true}/>
      ),
    });*/
  }, [])

  const onSubmit = async(data) => {
    setLoading(true)
    const peopleDocRef = doc(db, FIREBASE_COLLECTION_PEOPLES, itemId)
    await updateDoc(
      peopleDocRef,
      data
    ).catch((err) => console.error(err)).then(() => {
       navigation.goBack()
    }).finally(() => {
      setLoading(false)
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      {
        loading && (<ActivityIndicator size="large" />)
      }
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoFocus = {true}
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
              placeholder="City"
              style={styles.input}
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
              placeholder="Company"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="company"
        />
        {errors.company && <Text style={styles.error}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Position"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="position"
        />
        {errors.position && <Text style={styles.error}>This is required.</Text>}
        
        <Controller
          control={control}
          rules={{
            required: {value: true, message: "This field is required"}, 
            pattern: {value: URL_REGEX, message:"Invalid URL"}
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Avatar"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="avatar"
        />
        {errors.avatar && <Text style={styles.error}>{errors.avatar.message}</Text>}

        <Controller
          control={control}
          rules={{
            pattern: {value: URL_REGEX, message:"Invalid URL."}
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Facebook"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="social_networks.facebook"
        />
        {errors?.social_networks?.facebook && <Text style={styles.error}>{errors.social_networks.facebook.message}</Text>}

        <Controller
          control={control}
          rules={{
            pattern: URL_REGEX
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Twitter"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="social_networks.twitter"
        />
        {errors?.social_networks?.twitter && <Text style={styles.error}>Invalid URL.</Text>}
        
        <Controller
          control={control}
          rules={{
            pattern: URL_REGEX
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Instagram"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="social_networks.instagram"
        />
        {errors?.social_networks?.instagram && <Text style={styles.error}>Invalid URL.</Text>}

        <Controller
          control={control}
          rules={{
            pattern: {value: URL_REGEX, message:"Invalid URL."}
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Linkedin"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="social_networks.linkedin"
        />
        {errors.linkedin && <Text style={styles.error}>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            pattern: {value: URL_REGEX, message:"Invalid URL."}
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Skype"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="social_networks.skype"
        />
        {errors.linkedin && <Text style={styles.error}>This is required.</Text>}
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
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
    marginLeft:10,
    color: 'red'
  }
});

export default Edit;
