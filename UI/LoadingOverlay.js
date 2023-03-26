import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { GlobalColors } from "../constants/colors";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 23,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.colors.lightPurple,
  },
});
export default LoadingOverlay;
