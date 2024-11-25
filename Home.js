import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const productItems = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Product ${i + 1}`,
    price: `₱${(i + 1) * 100}`,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.background}
        >
          {/* Top Container with Search, Cart, and Message Icons */}
          <View style={styles.topContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Browse Products here..."
              placeholderTextColor="#000"
            />
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

          {/* Scrollable Sections */}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Featured Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Image
                  source={require("./assets/home/featured.png")}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Featured</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
              >
                {productItems.map((item) => (
                  <View key={item.id} style={styles.productContainer}>
                    <Image
                      source={require("./assets/home/product.png")}
                      style={styles.productImage}
                    />
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Recently Viewed Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Image
                  source={require("./assets/home/recent.png")}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Recently Viewed</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
              >
                {productItems.map((item) => (
                  <View key={item.id} style={styles.productContainer}>
                    <Image
                      source={require("./assets/home/product.png")}
                      style={styles.productImage}
                    />
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.home_navCircle}>
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
        <TouchableOpacity
          style={styles.navCircle}
          onPress={() => navigation.navigate("ProfilePage")} // Navigate to ProfilePage
        >
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
    backgroundColor: "#7190BF", // Bottom portion color
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
    paddingTop: 30,
    paddingHorizontal: 35,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  topIcons: {
    flexDirection: "row",
  },
  topIcon: {
    width: 45,
    height: 45,
    marginLeft: 10,
    resizeMode: "contain",
    backgroundColor: "#201b51",
    borderWidth: 2,
    borderRadius: 5,
  },
  message_topIcon: {
    width: 45,
    height: 45,
    marginLeft: 10,
    resizeMode: "contain",
    borderRadius: 25,
  },
  scrollViewContent: {
    paddingBottom: 90, // To avoid overlap with bottom navigation
  },
  sectionContainer: {
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  sectionIcon: {
    width: 50, // Increased width to accommodate padding
    height: 50, // Increased height to accommodate padding
    margin: 10,
    marginRight: 5,
    backgroundColor: "#201b51",
    borderRadius: 5, // Adjusted border radius for a perfect circle
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#201B51",
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  productContainer: {
    backgroundColor: "#7190BF",
    marginLeft: 20,
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    width: 150,
  },
  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 5,
    resizeMode: "contain",
  },
  productTitle: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 12,
    color: "#FFF",
    marginBottom: 10,
  },
  bottomNavigation: {
    height: 75,
    backgroundColor: "#7190BF",
    marginTop: 5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  navCircle: {
    width: 65,
    height: 65,
    backgroundColor: "#4E56A0",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  home_navCircle: {
    width: 65,
    height: 65,
    backgroundColor: "#4E56A0",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});
