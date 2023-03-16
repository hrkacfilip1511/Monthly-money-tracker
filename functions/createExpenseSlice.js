const createExpenseSlice = (set, get) => ({
  budget: 0.0,
  expenses: [],
  lastMonthBalance: 250.0,
  thisMonthCosts: 0.0,
  setNewBudget: (newBudgetValue) => {
    set({ budget: newBudgetValue });
  },
  setExpenses: (expense) => {
    set({ expenses: [...get().expenses, expense] });
    set({
      thisMonthCosts: get().expenses.reduce(
        (acc, curr) => acc + curr.amount,
        0
      ),
    });
  },
  deleteExpense: (expenseId) => {
    set({
      expenses: get().expenses.filter((expense) => expense.id !== expenseId),
    });
    set({
      thisMonthCosts: get().expenses.reduce(
        (acc, curr) => acc + curr.amount,
        0
      ),
    });
  },
  updateExpense: (updatedVal) => {
    const findedIndex = get().expenses.findIndex(
      (expense) => expense.id === updatedVal.id
    );
    // console.log("novi", updatedVal);
    // console.log("index", findedIndex);
    // const updatedArray = [...get().expenses];
    // updatedArray[findedIndex] = { ...updatedArray[findedIndex], updatedVal };
    // console.log(updatedArray);
    // set({
    //   expenses: updatedArray
    // });
    // console.log("expenses", get().expenses);
    // set({
    //   thisMonthCosts: get().expenses.reduce(
    //     (acc, curr) => acc + curr.amount,
    //     0
    //   ),
    // });
  },
});

export default createExpenseSlice;
