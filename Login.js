import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Animated,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startFadeIn();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      startFadeIn();
    }, [])
  );

  const handleButtonPress = (navigateTo) => {
    setLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setLoading(false);
      navigation.navigate(navigateTo);
    }, 3000);
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>
          ROUTER{"\n"}AND{"\n"}DRAWER
        </Text>
        <Text style={styles.subtitle}>Router and Drawer Application</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Dashboard")}
          disabled={loading}
        >
          <LinearGradient
            colors={["#D66464", "#703434"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Register")}
          disabled={loading}
        >
          <LinearGradient
            colors={["#D66464", "#703434"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleButtonPress("ForgotPass")}
          disabled={loading}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Loading Overlay */}
      {loading && (
        <Animated.View
          style={[
            styles.loadingOverlay,
            { opacity: fadeAnim }, // Bind opacity to fadeAnim for overlay
          ]}
        >
          <ActivityIndicator size="large" color="#fff" />
        </Animated.View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "900",
    textAlign: "left",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
    borderColor: "#F2A4A4",
    borderWidth: 3,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginVertical: 10,
    borderColor: "#F2A4A4",
    borderWidth: 3,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
