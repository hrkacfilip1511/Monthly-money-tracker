import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalColors } from "../constants/colors";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
const ExpensesOutputHeader = ({ name, onPress, total }) => {
  let status;
  let percentageDeficit = -5.2; //Računat razliku izmedju trenutnog i proteklog mjeseca i prikazat u postocima
  if (name === "Budget") {
    status = (
      <Pressable onPress={onPress}>
        <View style={styles.budgetContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.budgetText}>{total.toFixed(2)} KM</Text>
        </View>
      </Pressable>
    );
  } else {
    status = (
      <View style={styles.balanceContainer}>
        {percentageDeficit < 0 ? (
          <View style={styles.percentageDetails}>
            <Entypo
              name="triangle-down"
              size={30}
              color={GlobalColors.colors.lightRed}
            />
            <Text style={styles.percentageText}>{percentageDeficit} %</Text>
          </View>
        ) : (
          <View style={styles.percentageDetails}>
            <Entypo
              name="triangle-up"
              size={30}
              color={GlobalColors.colors.moneyGreen}
            />
            <Text style={styles.percentageText}>{percentageDeficit} %</Text>
          </View>
        )}
        <View style={styles.balanceDetails}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.balanceText, total < 0 && styles.deficitMoney]}>
            {total.toFixed(2)} <Text style={styles.moneyType}>KM</Text>
          </Text>
        </View>
      </View>
    );
  }
  return status;
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
  balanceContainer: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GlobalColors.colors.darkBlue,
    margin: 8,
    borderRadius: 8,
    elevation: 4,
  },
  balanceDetails: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  percentageDetails: {
    width: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: GlobalColors.colors.white,
    fontSize: 16,
    fontWeight: "900",
  },
  balanceText: {
    fontSize: 23,
    color: GlobalColors.colors.moneyGreen,
  },
  deficitMoney: {
    color: GlobalColors.colors.lightRed,
  },
  moneyType: {
    color: GlobalColors.colors.white,
  },
  percentageText: {
    color: "white",
    fontSize: 17,
  },
});
export default ExpensesOutputHeader;
