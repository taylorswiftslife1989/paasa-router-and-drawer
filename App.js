import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"; // Drawer Navigator
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Register from "./Register";
import ForgotPass from "./ForgotPass";
import Dashboard from "./Dashboard";
import VerifyPass from "./VerifyPass";
import CreatePass from "./CreatePass";

// Initialize Stack and Drawer Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Splash Screen
function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate("Login");
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>
            ROUTER{"\n"}AND{"\n"}DRAWER
          </Text>
          <View style={styles.profileBorder}>
            <Image
              source={require("./assets/profile.jpg")}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.footerText}>Christian Paasa</Text>
        </SafeAreaView>
      </Animated.View>
    </ImageBackground>
  );
}

// Custom Drawer Content
function CustomDrawerContent(props) {
  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            props.navigation.navigate("Login"); // Navigate to Login screen after logout
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <View style={styles.drawerContent}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Dashboard")}
        >
          <Text style={styles.drawerItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.drawerItem}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Drawer Navigator with Custom Drawer
function DashboardDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="VerifyPass" component={VerifyPass} />
        <Stack.Screen name="CreatePass" component={CreatePass} />
        {/* Dashboard wrapped in Drawer Navigator */}
        <Stack.Screen name="Dashboard" component={DashboardDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "800",
    textAlign: "left",
  },
  profileBorder: {
    width: 108,
    height: 108,
    borderRadius: 54,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#D66464",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  drawerContent: {
    padding: 20,
  },
  drawerItem: {
    fontSize: 18,
    paddingVertical: 15,
    color: "#333",
  },
});
