import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import useStore from "../hooks/useStore";
import { GlobalColors } from "../constants/colors";
import { Entypo } from "@expo/vector-icons";

const ThisMonthBalance = ({ thisMonthCosts }) => {
  const budget = useStore((state) => state.budget);
  const lastMonthBalance = useStore((state) => state.lastMonthBalance);
  const [thisMonthBalance, setThisMonthBalance] = useState();
  const [percentageDeficit, setPercentageDeficit] = useState(0);
  useEffect(() => {
    let thisMonthBalance;
    thisMonthBalance = budget - thisMonthCosts;
    setThisMonthBalance(thisMonthBalance);
  }, [budget, thisMonthCosts]);

  useEffect(() => {
    let percentageDeficit = 0;
    percentageDeficit =
      ((thisMonthBalance - lastMonthBalance) / Math.abs(lastMonthBalance)) *
      100;
    //Računat razliku izmedju trenutnog i proteklog mjeseca i prikazat u postocima
    setPercentageDeficit(percentageDeficit);
  }, [thisMonthBalance, lastMonthBalance]);
  return (
    <View
      style={[
        styles.balanceContainer,
        !percentageDeficit && styles.percentageUnVisible,
      ]}
    >
      {percentageDeficit < 0 && (
        <View style={styles.percentageDetails}>
          <Entypo
            name="triangle-down"
            size={30}
            color={GlobalColors.colors.lightRed}
          />
          <Text style={styles.percentageText}>
            {percentageDeficit !== -Infinity &&
              `${percentageDeficit?.toFixed(2)} %`}
          </Text>
        </View>
      )}
      {percentageDeficit > 0 && (
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
        <Text style={styles.name}>Balance</Text>
        <Text
          style={[
            styles.balanceText,
            thisMonthBalance < 0 && styles.deficitMoney,
          ]}
        >
          {Number(thisMonthBalance) && thisMonthBalance.toFixed(2)}
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GlobalColors.colors.darkBlue,
    margin: 8,
    borderRadius: 8,
    elevation: 4,
  },
  percentageUnVisible: {
    justifyContent: "flex-end",
  },
  balanceDetails: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  percentageDetails: {
    width: 175,
    flexDirection: "row",
    alignItems: "center",
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
export default ThisMonthBalance;
