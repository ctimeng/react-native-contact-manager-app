import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const Create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = () => {
    console.log("go");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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
            />
          )}
          name="name"
        />
        {errors.name && <Text>This is required.</Text>}

        <TextInput placeholder="City" style={styles.input} />
        <TextInput placeholder="Company" style={styles.input} />
        <TextInput placeholder="Position" style={styles.input} />
        <TextInput placeholder="Avatar" style={styles.input} />
        <TextInput placeholder="Facebook" style={styles.input} />
        <TextInput placeholder="Twitter" style={styles.input} />
        <TextInput placeholder="Instagram" style={styles.input} />
        <TextInput placeholder="Linkedin" style={styles.input} />
        <TextInput placeholder="Skype" style={styles.input} />
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
});

export default Create;
