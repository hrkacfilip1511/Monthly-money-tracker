import { View, Text } from "react-native";
import React from "react";

const ChangeBudget = ({ route }) => {
  return (
    <View>
      <Text>{route.params.currentBudget}</Text>
    </View>
  );
};

export default ChangeBudget;
