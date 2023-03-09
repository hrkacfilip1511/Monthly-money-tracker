import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "./constants/colors";
import ChangeBudget from "./screens/ChangeBudget";
import CurrentExpenses from "./screens/CurrentExpenses";
import LastMonthExpenses from "./screens/LastMonthExpenses";
import ManageExpense from "./screens/ManageExpenses";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "./UI/IconButton";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalColors.colors.darkBlue },
        headerTintColor: GlobalColors.colors.white,
        tabBarStyle: { backgroundColor: GlobalColors.colors.darkBlue },
        tabBarActiveTintColor: GlobalColors.colors.orange,
        tabBarInactiveTintColor: GlobalColors.colors.white,
        headerRight: () => (
          <IconButton
            iconName="add"
            size={24}
            color={GlobalColors.colors.white}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="CurrentExpenses"
        component={CurrentExpenses}
        options={{
          title: "This Month",
          tabBarLabel: "This Month",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="LastMonthExpenses"
        component={LastMonthExpenses}
        options={{
          title: "Last Month",
          tabBarLabel: "Last Month",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalColors.colors.darkBlue },
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
          <Stack.Screen name="ChangeBudget" component={ChangeBudget} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
