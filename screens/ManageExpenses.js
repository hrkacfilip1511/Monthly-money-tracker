import { View, TextInput, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import TextButton from "../UI/TextButton";
import IconButton from "../UI/IconButton";
import { GlobalColors } from "../constants/colors";
import useStore from "../hooks/useStore";
import {
  deleteExpenseFromBackend,
  storeExpense,
  updateExpenseFromBackend,
} from "../functions/https";
import LoadingOverlay from "../UI/LoadingOverlay";

const ManageExpenses = ({ route, navigation }) => {
  const isEditing = route.params?.expenseId;
  const expenseName = route.params?.expenseName;
  const [amountValue, setAmountValue] = useState(null);
  const [nameValue, setNameValue] = useState("");
  const [updateAmountValue, setUpdateAmountValue] = useState();
  const setExpenses = useStore((state) => state.setExpenses);
  const deleteExpense = useStore((state) => state.deleteExpense);
  const updateExpense = useStore((state) => state.updateExpense);
  const [dateValue, setDateValue] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  let output;
  const cancelHandler = () => {
    navigation.navigate("CurrentExpenses");
  };
  const updateHandler = () => {
    if (Number(updateAmountValue)) {
      setIsSubmitted(true);
      const updatedExpense = {
        id: route.params.expenseId,
        description: expenseName,
        amount: parseFloat(updateAmountValue),
        date: new Date(),
      };
      updateExpense(updatedExpense);
      updateExpenseFromBackend(route.params.expenseId, updatedExpense);
      navigation.navigate("CurrentExpenses");
    } else {
      Alert.alert("Update Amount Failed", "Amount needs to be a number!");
    }
  };
  const addNewExpenseHandler = async () => {
    if (nameValue.trim().length > 0 && Number(amountValue)) {
      setIsSubmitted(true);
      const expenseData = {
        description: nameValue,
        amount: parseFloat(amountValue),
        date:
          dateValue && new Date().getMonth() === new Date(dateValue)?.getMonth()
            ? new Date(dateValue)
            : new Date(),
      };
      const id = await storeExpense(expenseData);
      setExpenses({ ...expenseData, id: id });
      navigation.navigate("CurrentExpenses");
    } else {
      Alert.alert(
        "Expense Form Failed",
        "Input fields can not be empty, name must be string, amount must be number, date must be format YYYY-MM-DD"
      );
    }
  };
  const deleteHandler = () => {
    setIsSubmitted(true);
    deleteExpense(route.params.expenseId);
    deleteExpenseFromBackend(route.params.expenseId);
    navigation.navigate("CurrentExpenses");
  };
  const nameHandler = (text) => {
    setNameValue(text);
  };
  const amountHandler = (num) => {
    setAmountValue(num);
  };
  const dateHandler = (dateVal) => {
    setDateValue(dateVal);
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
        <View style={styles.inputField}>
          <TextInput
            style={styles.inputValue}
            placeholder={`Expense date`}
            placeholderTextColor="white"
            onChangeText={dateHandler}
            value={dateValue}
          />
        </View>
        <View style={styles.buttons}>
          <TextButton text="Cancel" onPress={cancelHandler} flatMode={true} />
          <TextButton text="Add" onPress={addNewExpenseHandler} />
        </View>
      </View>
    );
  }
  if (isSubmitted) {
    return <LoadingOverlay />;
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
