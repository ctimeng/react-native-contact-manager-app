import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FIREBASE_COLLECTION_PEOPLES, DEFAULT_PEOPLE } from "../global";
import db from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

const Create = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const URL_REGEX =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_PEOPLE,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    data.isContact = true;
    await addDoc(collection(db, FIREBASE_COLLECTION_PEOPLES), data)
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
              pattern: URL_REGEX,
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
            <Text style={styles.error}>Invalid URL.</Text>
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
              pattern: URL_REGEX,
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
          {errors?.social_networks?.linkedin && (
            <Text style={styles.error}>Invalid URL.</Text>
          )}

          <Controller
            control={control}
            rules={{
              pattern: URL_REGEX,
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
          {errors?.social_networks?.skype && (
            <Text style={styles.error}>Invalid URL.</Text>
          )}
          <Button title="Save" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    fontSize: 12,
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

export default Create;
