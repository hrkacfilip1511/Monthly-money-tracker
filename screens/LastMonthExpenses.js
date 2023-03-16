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
  const lastMonthBalance = useStore((state) => state.lastMonthBalance);
  const budget = useStore((state) => state.budget);
  return (
    <View>
      <BudgetHeader name="Budget" total={budget} />
      <ExpensesOutputHeader
        name="Balance"
        total={lastMonthBalance}
        isLastMonth={true}
      />
      <ExpensesOutputItems expenses={lastMonthExpenses} />
    </View>
  );
};

export default LastMonthExpenses;
