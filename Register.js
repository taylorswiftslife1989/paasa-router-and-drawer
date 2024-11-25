import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  Animated,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBackPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Login");
    });
  };

  const handleSignUp = () => {
    if (!selectedGender) {
      Alert.alert("Error", "Please select your gender.");
      return;
    }
    Alert.alert(
      "Registration",
      "Account Registration has been completed successfully",
      [{ text: "OK", onPress: () => navigation.navigate("Login") }]
    );
  };

  const handleUploadCOR = () => {
    Alert.alert("Upload COR", "COR uploaded successfully.");
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: "#4E56A0" }]}
            onPress={handleBackPress}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Registration Form</Text>
          <Text style={styles.subtitle}>Please fill in the details below:</Text>

          <Text style={styles.label}>COR</Text>

          <TouchableOpacity
            style={[styles.uploadButton, { backgroundColor: "#4E56A0" }]}
            onPress={handleUploadCOR}
          >
            <Text style={styles.uploadButtonText}>Upload COR</Text>
          </TouchableOpacity>
          <Text style={styles.label}>ID Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
          />

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
          />

          <Text style={styles.genderText}>Gender:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                selectedGender === "Male" && styles.selectedGenderOption,
              ]}
              onPress={() => setSelectedGender("Male")}
            >
              <Text style={styles.genderOptionText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                selectedGender === "Female" && styles.selectedGenderOption,
              ]}
              onPress={() => setSelectedGender("Female")}
            >
              <Text style={styles.genderOptionText}>Female</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            placeholderTextColor="#555"
          />

          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: "#4E56A0" }]}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent", // Change from "rgba(0, 0, 0, 0.5)"
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    width: "20%",
    height: 45,
    top: 10,
    left: 55,
    overflow: "hidden",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 800,
    textAlign: "center",
  },
  title: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
    top: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#000",
    fontSize: 15,
    top: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#000",
    fontSize: 16,
    marginTop: 5,
    textAlign: "left",
    width: "70%",
    alignSelf: "center",
  },
  input: {
    width: "70%",
    height: 40,
    backgroundColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
    borderColor: "#4E56A0",
    borderWidth: 2,
  },
  uploadButton: {
    width: "70%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#4E56A0",
    borderWidth: 2,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    width: "40%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  genderText: {
    color: "#000",
    fontSize: 16,
    marginTop: 5,
    left: 20,
    textAlign: "left",
    width: "80%",
    alignSelf: "center",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  genderOption: {
    width: 80,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#4E56A0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedGenderOption: {
    color: "#fff",
    backgroundColor: "#4E56A0",
  },
  genderOptionText: {
    fontSize: 16,
    color: "#000",
  },
});
