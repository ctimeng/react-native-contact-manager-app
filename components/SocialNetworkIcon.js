import {
  faTwitter,
  faInstagram,
  faLinkedin,
  faSkype,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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

export { socialNetworkIcon };
