import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ title, onSubmit, name, color = "#FFD700" }: any) => {
  return (
    <TouchableOpacity
      onPress={onSubmit}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        {name && (
          <View style={{ flex: 1 }}>
            <FontAwesome name={name} size={25} color={color} />
          </View>
        )}

        <Text
          style={{ flex: 2, textAlign: "center", justifyContent: "center" }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFD700",
    height: 40,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
