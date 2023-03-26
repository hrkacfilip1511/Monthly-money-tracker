import { View, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import useStore from "../hooks/useStore";
import { GlobalColors } from "../constants/colors";
import TextButton from "../UI/TextButton";
import BudgetHeader from "../components/BudgetHeader";

const ChangeBudget = ({ navigation }) => {
  const budgetValue = useStore((state) => state.budget);
  const setNewBudget = useStore((state) => state.setNewBudget);
  const [budgetVal, setBudgetVal] = useState();
  const newBudgetInputHandler = (value) => {
    setBudgetVal(parseFloat(value));
  };

  const cancelNewBudgetHandler = () => {
    navigation.navigate("CurrentExpenses");
  };

  const confirmNewBudgetHandler = () => {
    if (budgetVal || Number(budgetVal) || budgetVal >= 0) {
      setNewBudget(budgetVal);
      navigation.navigate("CurrentExpenses");
    } else {
      Alert.alert("Budget Error", "Budget value must be a number!");
    }
  };
  return (
    <View style={styles.container}>
      <BudgetHeader name="Budget" total={budgetValue} />
      <View style={styles.inputBudgetContainer}>
        <TextInput
          placeholder="New Budget"
          style={styles.newBudgetInput}
          onChangeText={newBudgetInputHandler}
        />
        <View style={styles.buttons}>
          <TextButton
            text="Cancel"
            onPress={cancelNewBudgetHandler}
            flatMode={true}
          />
          <TextButton text="Confirm" onPress={confirmNewBudgetHandler} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  newBudgetInput: {
    borderBottomWidth: 2,
    borderBottomColor: GlobalColors.colors.lightPurple,
    color: GlobalColors.colors.white,
    minWidth: 180,
    textAlign: "center",
    marginTop: 20,
    padding: 5,
    fontSize: 18,
  },
  inputBudgetContainer: {
    backgroundColor: GlobalColors.colors.skyBlue,
    flexDirection: "column",
    marginTop: 40,
    alignItems: "center",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
export default ChangeBudget;
