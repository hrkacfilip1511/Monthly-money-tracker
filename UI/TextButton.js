import React from "react";
import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { GlobalColors } from "../constants/colors";
const TextButton = ({ onPress, text, flatMode }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.buttonContainer, flatMode && styles.flat]}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    backgroundColor: GlobalColors.colors.lightPurple,
    minWidth: 120,
    elevation: 1,
    borderRadius: 5,
    marginVertical: 30,
  },
  buttonText: {
    color: GlobalColors.colors.white,
    textAlign: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  pressed: {
    opacity: 0.8,
  },
});
export default TextButton;
