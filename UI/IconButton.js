import React from "react";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { GlobalColors } from "../constants/colors";
const IconButton = ({ iconName, onPress, color, size, text }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <View style={text && styles.iconTextContainer}>
          {text && <Text style={styles.iconText}>{text}</Text>}
          <Ionicons name={iconName} size={size} color={color} />
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
  iconTextContainer: {
    width: 200,
    flexDirection: "column",
    backgroundColor: GlobalColors.colors.lightRed,
    alignItems: "center",
    padding: 6,
    borderRadius: 20,
  },
  iconText: {
    fontSize: 17,
    color: GlobalColors.colors.white,
    marginBottom: 5,
  },
  pressed: {
    opacity: 0.7,
  },
});
export default IconButton;
