import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { GlobalColors } from "../constants/colors";

const BudgetHeader = ({ onPress, name, total }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.budgetContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.budgetText}>{total.toFixed(2)} KM</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  budgetContainer: {
    padding: 10,
    backgroundColor: GlobalColors.colors.lightPurple,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    borderRadius: 5,
    elevation: 4,
  },
  budgetText: {
    fontSize: 18,
    color: GlobalColors.colors.white,
  },

  name: {
    color: GlobalColors.colors.white,
    fontSize: 16,
    fontWeight: "900",
  },

  pressed: {
    opacity: 0.8,
  },
});
export default BudgetHeader;
