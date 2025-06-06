import { logout } from "@/api/services/auth";
import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const LogoutButton = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");

      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  const handleLogout = () => {
    mutate();
  };
  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={{ fontSize: 16, padding: 18 }}>
        {isAuthenticated ? "Вихід" : "Вхід"}
      </Text>
    </TouchableOpacity>
  );
};
