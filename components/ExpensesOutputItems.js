import { View, Text, FlatList, StyleSheet } from "react-native";
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
const styles = StyleSheet.create({
  // flatList: {
  //   flex: 1,
  // },
});
export default ExpensesOutputItems;
