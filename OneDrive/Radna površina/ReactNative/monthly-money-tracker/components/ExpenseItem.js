import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalColors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../functions/format-date";
const ExpenseItem = (props) => {
  const navigation = useNavigation();
  const manageExpenseHandler = () => {
    if (props.isCurrentMonth) {
      navigation.navigate("ManageExpense", {
        expenseId: props.expense.id,
        expenseName: props.expense.description,
      });
    }
  };
  const formattedDate = formatDate(props.expense.date);
  //  if(!props.isCurrentMonth) {

  //  }
  return (
    <Pressable
      onPress={manageExpenseHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseContainer}>
        <View style={styles.dollarIcon}>
          <MaterialIcons
            name="attach-money"
            size={24}
            color={GlobalColors.colors.lightRed}
          />
        </View>
        <View style={styles.details}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.itemTextDetail}>
              {props.expense.description}
            </Text>
            <Text style={styles.itemTextDetail}>{formattedDate}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{props.expense.amount}</Text>
            <Text style={styles.moneyType}>KM</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  dollarIcon: {
    width: 40,
    height: 40,
    backgroundColor: GlobalColors.colors.white,
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  expenseContainer: {
    backgroundColor: GlobalColors.colors.skyBlue,
    marginVertical: 7,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
    elevation: 3,
  },
  descriptionContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  details: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTextDetail: {
    color: GlobalColors.colors.white,
  },
  amountContainer: {
    width: 80,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: GlobalColors.colors.white,
    borderRadius: 10,
  },
  amountText: {
    color: GlobalColors.colors.lightRed,
    fontSize: 16,
  },
  moneyType: {
    color: GlobalColors.colors.black,
  },
  pressed: {
    opacity: 0.8,
  },
});
export default ExpenseItem;
