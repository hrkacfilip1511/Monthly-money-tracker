import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalColors } from "../constants/colors";

const ThisMonthCost = ({ thisMonthCosts }) => {
  return (
    <View style={[styles.costContainer]}>
      <View style={styles.costDetails}>
        <Text style={styles.name}>Costs</Text>
        <Text style={styles.costsText}>{thisMonthCosts}</Text>
        <Text style={styles.moneyType}>KM</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  costContainer: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: GlobalColors.colors.darkBlue,
    margin: 8,
    borderRadius: 8,
    elevation: 4,
  },
  costDetails: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  name: {
    color: GlobalColors.colors.white,
    fontSize: 16,
    fontWeight: "900",
  },
  costsText: {
    fontSize: 23,
    color: GlobalColors.colors.lightRed,
  },
  moneyType: {
    color: GlobalColors.colors.white,
  },
});
export default ThisMonthCost;
