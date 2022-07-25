import {
  Text,
  Image,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
  faSkype,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Row = ({ people, onAddContact, onAddFavourite, onItemPress }) => {

  const socialNetworkIcon = (social) => {
    switch (social) {
      case "twitter":
        return <FontAwesomeIcon icon={faTwitter} key={social} />;
      case "instagram":
        return <FontAwesomeIcon icon={faInstagram} key={social} />;
      case "linkedin":
        return <FontAwesomeIcon icon={faLinkedin} key={social} />;
      case "skype":
        return <FontAwesomeIcon icon={faSkype} key={social} />;
      default:
        return <FontAwesomeIcon icon={faFacebookF} key={social} />;
    }
  };

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View>
        <View style={styles.contactCon}>
          <Image
            source={{ uri: people.avatar }}
            style={{
              width: 100,
              height: 100,
              margin: 5,
            }}
          />
          <View>
            <Text>{people.name}</Text>
            <Text>{people.city}</Text>
            <View style={styles.contactCon}>
              {Object.keys(people.social_networks).map((key, index) =>
                socialNetworkIcon(key)
              )}
            </View>
            <View style={styles.containButtons}>
              <Button
                onPress={() => onAddContact(`${people.id}`)}
                title="ADD TO CONTACTS"
                style={styles.button}
              />
              <Button
                onPress={(e) => onAddFavourite(e, `${people.id}`)}
                title="ADD TO FAVOURITE"
                style={styles.button}
              />
            </View>
          </View>
        </View>
        <View
          style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
  containButtons: {
    flex: 1,
    flexDirection: "row",
    padding: 5
  },
  button: {
    marginLeft: 2,
    padding: 5
  },
});

export default Row;
