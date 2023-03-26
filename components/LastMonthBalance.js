import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalColors } from "../constants/colors";
import useStore from "../hooks/useStore";

const LastMonthBalance = ({ lastMonthCost }) => {
  const budget = useStore((state) => state.budget);
  const [lastMonthBalance, setLastMonthBalance] = useState();
  const setLastMonthBalanceFromZustand = useStore(
    (state) => state.setLastMonthBalance
  );
  useEffect(() => {
    let lastMonthBal;
    lastMonthBal = budget - lastMonthCost;
    setLastMonthBalance(lastMonthBal);
    setLastMonthBalanceFromZustand(lastMonthBal);
  }, [budget, lastMonthCost]);
  return (
    <View style={[styles.balanceContainer]}>
      <View style={styles.balanceDetails}>
        <Text style={styles.name}>Balance</Text>
        <Text
          style={[
            styles.balanceText,
            lastMonthBalance < 0 && styles.deficitMoney,
          ]}
        >
          {lastMonthBalance?.toFixed(2)}
        </Text>
        <Text style={styles.moneyType}>KM</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  balanceContainer: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "flex-end",
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
});
export default LastMonthBalance;
