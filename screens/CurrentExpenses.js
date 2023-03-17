import { StyleSheet, View } from "react-native";
import React from "react";
import ExpensesOutputItems from "../components/ExpensesOutputItems";
import ExpensesOutputHeader from "../components/ExpensesOutputHeader";
import useStore from "../hooks/useStore";
import BudgetHeader from "../components/BudgetHeader";
const CurrentExpenses = ({ navigation }) => {
  const budget = useStore((state) => state.budget);
  const changeBudgetHandler = () => {
    navigation.navigate("ChangeBudget");
  };
  const expenses = useStore((state) => state.expenses);
  const thisMonthExpenses = expenses.filter((expense) => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const previousMonths = new Date(expense.date).getMonth();
    const expenseYear = new Date(expense.date).getFullYear();
    return thisMonth - previousMonths === 0 && thisYear === expenseYear;
  });
  return (
    <View style={styles.bigbig}>
      <BudgetHeader
        name="Budget"
        onPress={changeBudgetHandler}
        total={budget}
      />
      <ExpensesOutputHeader name="Costs" isCosts={true} />
      <ExpensesOutputHeader name="Balance" />
      <ExpensesOutputItems expenses={thisMonthExpenses} isCurrentMonth={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  bigbig: {
    flex: 1,
  },
});
export default CurrentExpenses;
