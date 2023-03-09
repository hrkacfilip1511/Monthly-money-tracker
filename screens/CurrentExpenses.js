import { View } from "react-native";
import React from "react";
import { DUMMY_EXPENSES } from "../dummy-data";
import ExpensesOutputItems from "../components/ExpensesOutputItems";
import ExpensesOutputHeader from "../components/ExpensesOutputHeader";
const CurrentExpenses = ({ navigation }) => {
  const changeBudgetHandler = () => {
    navigation.navigate("ChangeBudget", {
      currentBudget: 2350.55,
    });
  };
  return (
    <View>
      <ExpensesOutputHeader
        name="Budget"
        onPress={changeBudgetHandler}
        total={2350.55}
      />
      <ExpensesOutputHeader name="Balance" total={1245.55} />
      <ExpensesOutputItems expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default CurrentExpenses;
