import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

function Dashboard() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

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
            setLoading(true);
            Animated.timing(fadeAnim, {
              toValue: 1, // Fade in the overlay
              duration: 500, // 500ms fade-in duration
              useNativeDriver: true,
            }).start(() => {
              // After fade-in, wait 3 seconds and navigate back
              setTimeout(() => {
                Animated.timing(fadeAnim, {
                  toValue: 0, // Fade out the overlay
                  duration: 500, // 500ms fade-out duration
                  useNativeDriver: true,
                }).start(() => {
                  setLoading(false);
                  navigation.navigate("Login");
                });
              }, 3000); // 3-second delay
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.profileBorder}>
          <Image
            source={require("./assets/profile.jpg")}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.name}>Christian Paasa {"\n"}</Text>

        {/* Open Drawer Button */}
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={() => navigation.openDrawer()}
        >
          <Text style={styles.drawerButtonText}>Open Drawer</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loading}
        >
          <LinearGradient
            colors={["#D66464", "#703434"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutButtonGradient}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Loading Overlay with Fade Animation */}
      {loading && (
        <Animated.View style={[styles.loadingOverlay, { opacity: fadeAnim }]}>
          <ActivityIndicator size="large" color="#fff" />
        </Animated.View>
      )}
    </ImageBackground>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "800",
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileBorder: {
    width: 108,
    height: 108,
    borderRadius: 54,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#D66464",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logoutButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginVertical: 20,
    borderColor: "#F2A4A4",
    borderWidth: 3,
  },
  logoutButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6c5ce7",
    marginBottom: 20,
  },
  drawerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
