import { View, Text, FlatList } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpensesOutputItems = ({ expenses }) => {
  const renderExpensesHandler = (itemData) => {
    return <ExpenseItem expense={itemData.item} />;
  };

  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpensesHandler}
      />
    </View>
  );
};

export default ExpensesOutputItems;
