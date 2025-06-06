import { View } from "react-native";
import { LogoutButton } from "./ui/LogoutButton/LogoutButton";

export const Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        alignItems: "flex-end",
      }}
    >
      <LogoutButton />
    </View>
  );
};
