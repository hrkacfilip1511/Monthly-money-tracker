import { StyleSheet, View } from "react-native";
import React from "react";
import ExpensesOutputItems from "../components/ExpensesOutputItems";
import ExpensesOutputHeader from "../components/ExpensesOutputHeader";
import useStore from "../hooks/useStore";
import BudgetHeader from "../components/BudgetHeader";
const CurrentExpenses = ({ navigation }) => {
  const budget = useStore((state) => state.budget);
  const thisMonthCosts = useStore((state) => state.thisMonthCosts);
  const changeBudgetHandler = () => {
    navigation.navigate("ChangeBudget");
  };
  const expenses = useStore((state) => state.expenses);
  return (
    <View style={styles.bigbig}>
      <BudgetHeader
        name="Budget"
        onPress={changeBudgetHandler}
        total={budget}
      />
      <ExpensesOutputHeader name="Costs" isCosts={true} />
      <ExpensesOutputHeader name="Balance" />
      <ExpensesOutputItems expenses={expenses} isCurrentMonth={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  bigbig: {
    flex: 1,
  },
});
export default CurrentExpenses;
