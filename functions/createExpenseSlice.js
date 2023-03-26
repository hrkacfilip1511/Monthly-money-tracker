const createExpenseSlice = (set, get) => ({
  budget: 0,
  expenses: [],
  lastMonthBalance: 0,
  setNewBudget: (newBudgetValue) => {
    set({ budget: newBudgetValue });
  },
  setLastMonthBalance: (lastMonthBalance) => {
    set({ lastMonthBalance: lastMonthBalance });
  },
  setExpenses: (expense) => {
    set({ expenses: [...get().expenses, expense] });
  },
  setExpensesFromBackend: (expensesData) => {
    set({ expenses: expensesData });
  },
  deleteExpense: (expenseId) => {
    set({
      expenses: get().expenses.filter((expense) => expense.id !== expenseId),
    });
  },
  updateExpense: (expenseData) => {
    const expenses = get().expenses.map((expense) => {
      return expense.id === expenseData.id
        ? {
            ...expense,
            id: expenseData.id,
            description: expenseData.description,
            amount: expenseData.amount,
            date: expenseData.date,
          }
        : expense;
    });

    set({ expenses: expenses });
  },
  setLastMonthBalance: (lastBalance) => {
    set({ lastMonthBalance: lastBalance });
  },
});

export default createExpenseSlice;
