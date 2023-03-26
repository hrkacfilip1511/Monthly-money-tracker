import { View } from "react-native";
import React, { useEffect, useState } from "react";
import ExpensesOutputItems from "../components/ExpensesOutputItems";
import useStore from "../hooks/useStore";
import BudgetHeader from "../components/BudgetHeader";
import LastMonthCosts from "../components/LastMonthCosts";
import LastMonthBalance from "../components/LastMonthBalance";
import { getExpenses } from "../functions/https";
import LoadingOverlay from "../UI/LoadingOverlay";

const LastMonthExpenses = () => {
  const expenses = useStore((state) => state.expenses);
  const [isLoading, setIsLoading] = useState(true);
  const setExpensesFromBackend = useStore(
    (state) => state.setExpensesFromBackend
  );
  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpenses();
      setExpensesFromBackend(expenses);
      setIsLoading(false);
    };
    fetchExpenses();
  }, []);

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
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <View>
      <BudgetHeader name="Budget" total={budget} />
      <LastMonthCosts lastMonthCosts={lastMonthCosts} />
      <LastMonthBalance lastMonthCost={lastMonthCosts} />
      <ExpensesOutputItems expenses={lastMonthExpenses} />
    </View>
  );
};

export default LastMonthExpenses;
