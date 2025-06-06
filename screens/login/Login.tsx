import { login } from "@/api/services/auth";
import { LoginData, LoginResponse } from "@/types/auth";
import { validateEmail } from "@/utils/validations";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const { isPending, mutate } = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: login,
    onSuccess: async (data) => {
      await AsyncStorage.setItem("accessToken", data.token);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);

      router.push("/(tabs)");
      resetForm();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    if (!isEmailValid) return;

    mutate({ email, password });
  };

  const isDisabled = !email || !password;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Авторизуйтесь для входу</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-MAIL"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {!isValidEmail && (
              <Text style={{ marginTop: 4, marginLeft: 14, color: "tomato" }}>
                Невірний формат email
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="ВВЕДІТЬ ПАРОЛЬ"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isDisabled && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={isDisabled}
          >
            <Text style={styles.loginButtonText}>
              {isPending ? "ЗАВАНТАЖЕННЯ..." : "УВІЙТИ"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.qrCodeContainer}>
          <TouchableOpacity
            style={styles.qrCodeFrame}
            onPress={() => router.push("/scanner")}
          >
            <Image
              source={require("../../assets/images/ScanAuthImg.png")}
              style={styles.scanAuthImage}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
