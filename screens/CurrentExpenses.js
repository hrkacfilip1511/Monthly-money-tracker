import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ExpensesOutputItems from "../components/ExpensesOutputItems";
import useStore from "../hooks/useStore";
import BudgetHeader from "../components/BudgetHeader";
import ThisMonthCost from "../components/ThisMonthCost";
import ThisMonthBalance from "../components/ThisMonthBalance";
import { getExpenses } from "../functions/https";
import LoadingOverlay from "../UI/LoadingOverlay";
const CurrentExpenses = ({ navigation }) => {
  const budget = useStore((state) => state.budget);
  const [isLoading, setIsLoading] = useState(true);
  const changeBudgetHandler = () => {
    navigation.navigate("ChangeBudget");
  };
  const setExpensesFromBackend = useStore(
    (state) => state.setExpensesFromBackend
  );
  const expenses = useStore((state) => state.expenses);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpenses();
      setExpensesFromBackend(expenses);
      setIsLoading(false);
    };
    fetchExpenses();
  }, []);
  const thisMonthExpenses = expenses.filter((expense) => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const previousMonths = new Date(expense.date).getMonth();
    const expenseYear = new Date(expense.date).getFullYear();
    return thisMonth - previousMonths === 0 && thisYear === expenseYear;
  });
  const thisMonthCosts = thisMonthExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.bigbig}>
      <BudgetHeader
        name="Budget"
        onPress={changeBudgetHandler}
        total={budget}
      />
      <ThisMonthCost thisMonthCosts={thisMonthCosts} />
      <ThisMonthBalance thisMonthCosts={thisMonthCosts} />
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
