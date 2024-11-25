import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfilePage() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    setLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setLoading(false);
          navigation.navigate("Login");
        });
      }, 3000);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.background}
        >
          {/* Top Container with Logo, Cart, and Message Icons */}
          <View style={styles.topContainer}>
            <Image source={require("./assets/logo.png")} style={styles.logo} />
            <View style={styles.topIcons}>
              <TouchableOpacity>
                <Image
                  source={require("./assets/home/cart.png")}
                  style={styles.topIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("./assets/home/message.png")}
                  style={styles.message_topIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Information */}
          <View style={styles.profileContainer}>
            <Image
              source={require("./assets/profile/profile-picture.jpg")}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>Billie Eilish</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLogout}
            >
              <Text style={styles.actionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmLogout}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navCircle}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./assets/navigation/home.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navCircle}>
          <Image
            source={require("./assets/navigation/marketplace.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navCircle}>
          <Image
            source={require("./assets/navigation/notifications.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profile_navCircle}>
          <Image
            source={require("./assets/navigation/profile.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#7190BF",
  },
  backgroundContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 15,
  },
  logo: {
    width: 100,
    height: 50,
    left: 0,
    resizeMode: "contain",
  },
  topIcons: {
    flexDirection: "row",
  },
  topIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  message_topIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#FFF",
    borderWidth: 3,
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  actionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: "#4E56A0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  actionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomNavigation: {
    height: 75,
    backgroundColor: "#7190BF",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#4E56A0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profile_navCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#4E56A0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    width: 300,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#4E56A0",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
