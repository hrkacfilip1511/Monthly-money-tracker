import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";
const IconButton = ({ iconName, onPress, color, size }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Ionicons name={iconName} size={size} color={color} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
});
export default IconButton;
