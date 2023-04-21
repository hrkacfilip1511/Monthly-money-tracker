import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../constants/categories";
import { GlobalColors } from "../constants/colors";

const ExpensesOutputItems = ({ expenses, isCurrentMonth }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const renderExpensesHandler = (itemData) => {
    return (
      <ExpenseItem expense={itemData.item} isCurrentMonth={isCurrentMonth} />
    );
  };
  const filteredByCategoryExpenses = expenses.filter((expense) => {
    if (selectedCategory === "all") {
      return expenses;
    } else {
      return expense.category === selectedCategory;
    }
  });
  return (
    <View>
      <View style={styles.filterBox}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
          style={{ color: GlobalColors.colors.white }}
        >
          <Picker.Item label="Show all" value={"all"} />
          {categories.map((category) => {
            return (
              <Picker.Item
                key={category.id}
                label={category.categoryName}
                value={category.categoryName}
              />
            );
          })}
        </Picker>
      </View>
      <FlatList
        data={filteredByCategoryExpenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpensesHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  filterBox: {
    padding: 10,
    backgroundColor: GlobalColors.colors.lightPurple,
    margin: 8,
    borderRadius: 5,
    elevation: 4,
  },
});
export default ExpensesOutputItems;
