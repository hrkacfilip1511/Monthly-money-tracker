import axios from "axios";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    "https://monthly-tracker-r-native-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(
    "https://monthly-tracker-r-native-default-rtdb.europe-west1.firebasedatabase.app/expenses.json"
  );
  const expensesData = [];
  for (const key in response.data) {
    const expenseResponseObj = {
      id: key,
      description: response.data[key].description,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      category: response.data[key].category,
    };
    expensesData.push(expenseResponseObj);
  }
  return expensesData;
};

export const updateExpenseFromBackend = (id, expenseAmount) => {
  return axios.put(
    `https://monthly-tracker-r-native-default-rtdb.europe-west1.firebasedatabase.app/expenses/${id}.json`,
    expenseAmount
  );
};
export const deleteExpenseFromBackend = (id) => {
  return axios.delete(
    `https://monthly-tracker-r-native-default-rtdb.europe-west1.firebasedatabase.app/expenses/${id}.json`
  );
};
