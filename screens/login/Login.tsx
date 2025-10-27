import { login } from "@/api/services/auth";
import { LoginData, LoginResponse } from "@/types/auth";
import { validateEmail } from "@/utils/validations";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Keyboard } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { styles } from "./styles";

export default function Login() {
  const router = useRouter();
  const primaryColor = useThemeColor({}, "primary");
  const notificationColor = useThemeColor({}, "popover");
  const [email, setEmail] = useState("owner@example.com");
  const [password, setPassword] = useState("secret");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

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
      setErrorMessage(null);
    },
    onError: (error) => {
      const err: any = error;
      const status = err?.response?.status as number | undefined;
      const data = err?.response?.data;
      let message = "Сталася помилка. Спробуйте ще раз.";

      if (err?.code === "ECONNABORTED") {
        message =
          "Час очікування вичерпано. Перевірте інтернет або адресу API.";
      } else if (status === 422 && data?.errors) {
        const nextFieldErrors: { email?: string; password?: string } = {};
        if (
          data.errors.email === "notFound" ||
          data.errors.password === "incorrectPassword"
        ) {
          message = "Невірний email або пароль.";
        }
        setFieldErrors(nextFieldErrors);
      } else if (data?.message) {
        message = Array.isArray(data.message)
          ? data.message.join("\n")
          : String(data.message);
      } else if (err?.message?.toLowerCase?.().includes("network")) {
        message = "Немає з’єднання з сервером. Перевірте мережу.";
      }

      setErrorMessage(message);
      console.log("AXIOS ERROR", {
        message: (error as any)?.message,
        code: (error as any)?.code,
        url: (error as any)?.config?.baseURL + (error as any)?.config?.url,
        status: (error as any)?.response?.status,
      });
    },
  });

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    if (!isEmailValid) return;

    setErrorMessage(null);
    setFieldErrors({});
    mutate({ email, password });
  };

  useEffect(() => {
    if (!errorMessage) return;
    const t = setTimeout(() => setErrorMessage(null), 3500);
    return () => clearTimeout(t);
  }, [errorMessage]);

  const isDisabled = !email || !password;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.mainContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Авторизуйтесь для входу</Text>

            {/* Email input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="E-MAIL"
                placeholderTextColor="#999"
                value={email}
                returnKeyType="next"
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMessage) setErrorMessage(null);
                  if (fieldErrors.email)
                    setFieldErrors((p) => ({ ...p, email: undefined }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!isValidEmail && (
                <Text style={{ marginTop: 4, marginLeft: 14, color: "tomato" }}>
                  Невірний формат email
                </Text>
              )}
            </View>

            {/* Password input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ВВЕДІТЬ ПАРОЛЬ"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                returnKeyType="done"
                onChangeText={(text) => {
                  setPassword(text);
                  if (errorMessage) setErrorMessage(null);
                  if (fieldErrors.password)
                    setFieldErrors((p) => ({ ...p, password: undefined }));
                }}
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

            {/* Login button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                (isDisabled || isPending) && { opacity: 0.7 },
              ]}
              onPress={() => {
                Keyboard.dismiss();
                handleLogin();
              }}
              disabled={isDisabled || isPending}
            >
              <Text style={styles.loginButtonText}>
                {isPending ? "ЗАВАНТАЖЕННЯ..." : "УВІЙТИ"}
              </Text>
            </TouchableOpacity>
          </View>
       
          </View>

        {/* Error message */}
        {errorMessage && (
          <View
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 24,
              backgroundColor: primaryColor,
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 12,
            }}
          >
            <Text style={{ color: notificationColor, textAlign: "center" }}>
              {errorMessage}
            </Text>
          </View>
        )}
         </SafeAreaView>
          </TouchableWithoutFeedback>

   
  );
}
