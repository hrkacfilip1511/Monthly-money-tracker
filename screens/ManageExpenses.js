import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import TextButton from "../UI/TextButton";
import IconButton from "../UI/IconButton";
import { GlobalColors } from "../constants/colors";
import useStore from "../hooks/useStore";

const ManageExpenses = ({ route, navigation }) => {
  const isEditing = route.params?.expenseId;
  const expenseName = route.params?.expenseName;
  const [amountValue, setAmountValue] = useState(null);
  const [nameValue, setNameValue] = useState("");
  const [updateAmountValue, setUpdateAmountValue] = useState();
  const setExpenses = useStore((state) => state.setExpenses);
  const deleteExpense = useStore((state) => state.deleteExpense);
  const updateExpense = useStore((state) => state.updateExpense);
  let output;
  const cancelHandler = () => {
    navigation.navigate("CurrentExpenses");
  };
  const updateHandler = () => {
    updateExpense(
      route.params.expenseId, // id
      expenseName, // description
      parseFloat(updateAmountValue), // amount
      new Date() // date
    );
    navigation.navigate("CurrentExpenses");
  };
  const addNewExpenseHandler = () => {
    setExpenses({
      id:
        Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 5),
      description: nameValue,
      amount: parseFloat(amountValue),
      date: new Date(),
    });
    navigation.navigate("CurrentExpenses");
  };
  const deleteHandler = () => {
    deleteExpense(route.params.expenseId);
    navigation.navigate("CurrentExpenses");
  };
  const nameHandler = (text) => {
    setNameValue(text);
  };
  const amountHandler = (num) => {
    setAmountValue(num);
  };
  updateOnChangeHandler = (num) => {
    setUpdateAmountValue(num);
  };
  useEffect(() => {
    navigation.setOptions({
      title: !!isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  if (!!isEditing) {
    //Update itema
    output = (
      <View style={styles.editExpenseContainer}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.inputValue}
            placeholder={`Edit '${expenseName}' amount here`}
            placeholderTextColor="white"
            onChangeText={updateOnChangeHandler}
            value={updateAmountValue}
          />
        </View>
        <View style={styles.buttons}>
          <TextButton text="Cancel" onPress={cancelHandler} flatMode={true} />
          <TextButton text="Update" onPress={updateHandler} />
        </View>
        <View>
          <IconButton
            text={expenseName}
            onPress={deleteHandler}
            iconName="trash"
            size={25}
            color="white"
          />
        </View>
      </View>
    );
  } else {
    //Dodavanje novog itema
    output = (
      <View style={styles.editExpenseContainer}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.inputValue}
            placeholder={`Expense name`}
            placeholderTextColor="white"
            onChangeText={nameHandler}
            value={nameValue}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.inputValue}
            placeholder={`Expense amount`}
            placeholderTextColor="white"
            onChangeText={amountHandler}
            value={amountValue}
          />
        </View>
        <View style={styles.buttons}>
          <TextButton text="Cancel" onPress={cancelHandler} flatMode={true} />
          <TextButton text="Add" onPress={addNewExpenseHandler} />
        </View>
      </View>
    );
  }

  return output;
};
const styles = StyleSheet.create({
  inputField: {
    minWidth: 150,
    borderBottomColor: GlobalColors.colors.lightPurple,
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  inputValue: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  editExpenseContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalColors.colors.skyBlue,
  },
});
export default ManageExpenses;
