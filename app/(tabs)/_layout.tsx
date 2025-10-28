import { Tabs, usePathname } from "expo-router";
import { ScanQrCode, Settings } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.accent,
        tabBarInactiveTintColor: Colors.light.textDisabled,

        tabBarStyle: {
          height: 74,
        },

        tabBarItemStyle: {
          paddingTop: 6,
        },

        tabBarLabelStyle: {
          fontSize: 14,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Вибір сесії",
          tabBarIcon: ({ color }) => <Settings size={30} color={color} />,
        }}
      />

      <Tabs.Screen
        name="scanner"
        options={{
          href: pathname !== "/" ? undefined : null,
          title: "Сканер",
          tabBarIcon: ({ color }) => <ScanQrCode size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
