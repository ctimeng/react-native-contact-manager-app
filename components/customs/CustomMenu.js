import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Alert, Image, View, Text, TouchableOpacity } from 'react-native';

const CustomMenu = (props) => {
  let _menu = null;
  return (
    <View style={props.menustyle}>
      <Menu
        ref={(ref) => (_menu = ref)}
        button={
          props.isIcon ? (
            <TouchableOpacity onPress={() => _menu.show()}>
              <Image
                source={{
                  uri: "https://reactnativecode.com/wp-content/uploads/2020/12/menu_icon.png",
                }}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          ) : (
            <Text onPress={() => _menu.show()} style={props.textStyle}>
              {props.menutext}
            </Text>
          )
        }
      >
        <MenuItem
          onPress={() => {
            Alert.alert("PopUp Menu Button Clicked...");
          }}
        >
          Menu Item 1
        </MenuItem>

        <MenuItem disabled>Disabled Menu Item 2</MenuItem>

        <MenuDivider />

        <MenuItem
          onPress={() => {
            Alert.alert("PopUp Menu Button Clicked...");
          }}
        >
          Menu Item 3
        </MenuItem>
      </Menu>
    </View>
  );
};

export default CustomMenu;
