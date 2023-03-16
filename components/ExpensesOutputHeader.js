import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalColors } from "../constants/colors";
import { Entypo } from "@expo/vector-icons";
import useStore from "../hooks/useStore";
const ExpensesOutputHeader = ({ name, total, isLastMonth, isCosts }) => {
  let status;
  const budget = useStore((state) => state.budget);
  const thisMonthCosts = useStore((state) => state.thisMonthCosts);
  const lastMonthBalance = useStore((state) => state.lastMonthBalance);
  let thisMontBalance;
  let totalBalance = 0;
  if (!isLastMonth) {
    thisMontBalance = budget - thisMonthCosts;
  }

  let percentageDeficit =
    ((thisMontBalance - lastMonthBalance) / Math.abs(lastMonthBalance)) * 100; //Računat razliku izmedju trenutnog i proteklog mjeseca i prikazat u postocima
  if (name === "Balance") {
    status = (
      <View
        style={[
          styles.balanceContainer,
          isLastMonth && styles.balanceContainerLastMonth,
        ]}
      >
        {!isLastMonth && percentageDeficit < 0 && (
          <View style={styles.percentageDetails}>
            <Entypo
              name="triangle-down"
              size={30}
              color={GlobalColors.colors.lightRed}
            />
            <Text style={styles.percentageText}>
              {percentageDeficit?.toFixed(2)} %
            </Text>
          </View>
        )}
        {!isLastMonth && percentageDeficit >= 0 && (
          <View style={styles.percentageDetails}>
            <Entypo
              name="triangle-up"
              size={30}
              color={GlobalColors.colors.moneyGreen}
            />
            <Text style={styles.percentageText}>
              {percentageDeficit?.toFixed(2)} %
            </Text>
          </View>
        )}

        <View style={styles.balanceDetails}>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={[
              styles.balanceText,
              thisMontBalance < 0 && styles.deficitMoney,
            ]}
          >
            {thisMontBalance
              ? thisMontBalance?.toFixed(2)
              : totalBalance?.toFixed(2)}
          </Text>
          <Text style={styles.moneyType}>KM</Text>
        </View>
      </View>
    );
  } else {
    status = (
      <View
        style={[
          styles.balanceContainer,
          isCosts && styles.costsContainerLastMonth,
        ]}
      >
        <View style={styles.balanceDetails}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.costsText}>{thisMonthCosts}</Text>
          <Text style={styles.moneyType}>KM</Text>
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
  balanceContainerLastMonth: {
    justifyContent: "flex-end",
  },
  costsContainerLastMonth: {
    flexDirection: "column",
    alignItems: "flex-end",
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
  costsText: {
    fontSize: 23,
    color: GlobalColors.colors.lightRed,
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
  pressed: {
    opacity: 0.8,
  },
});
export default ExpensesOutputHeader;
