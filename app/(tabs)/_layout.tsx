import { Tabs, usePathname } from "expo-router";
import { ScanQrCode, Settings } from "lucide-react-native";

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",

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
          title: "Параметри",
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
