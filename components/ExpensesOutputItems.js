import { FlatList } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesOutputItems = ({ expenses, isCurrentMonth }) => {
  const renderExpensesHandler = (itemData) => {
    return (
      <ExpenseItem expense={itemData.item} isCurrentMonth={isCurrentMonth} />
    );
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpensesHandler}
    />
  );
};

export default ExpensesOutputItems;
