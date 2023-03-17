import { View } from "react-native";
import React from "react";
import ExpensesOutputHeader from "../components/ExpensesOutputHeader";
import ExpensesOutputItems from "../components/ExpensesOutputItems";
import useStore from "../hooks/useStore";
import BudgetHeader from "../components/BudgetHeader";

const LastMonthExpenses = () => {
  const expenses = useStore((state) => state.expenses);
  const lastMonthExpenses = expenses.filter((expense) => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const previousMonths = new Date(expense.date).getMonth();
    const expenseYear = new Date(expense.date).getFullYear();
    return thisMonth - previousMonths === 1 && thisYear === expenseYear;
  });
  const setLastMonthBalance = useStore((state) => state.setLastMonthBalance);
  const budget = useStore((state) => state.budget);
  const lastMonthCosts = lastMonthExpenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const lastMonthBalance = budget - lastMonthCosts;
  if (lastMonthBalance) {
    setLastMonthBalance(lastMonthBalance);
  }
  return (
    <View>
      <BudgetHeader name="Budget" total={budget} />
      <ExpensesOutputHeader
        name="Costs"
        isCosts={true}
        lastMonthCosts={lastMonthCosts}
      />

      <ExpensesOutputHeader name="Balance" isLastMonth={true} />
      <ExpensesOutputItems expenses={lastMonthExpenses} />
    </View>
  );
};

export default LastMonthExpenses;
