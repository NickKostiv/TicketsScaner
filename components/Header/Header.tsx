import { View } from "react-native";
import { LogoutButton } from "./ui/LogoutButton/LogoutButton";
import { headerStyles } from "./styles";

export const Header = () => {
  return (
    <View
      style={headerStyles.header}
    >
      <LogoutButton />
    </View>
  );
};
