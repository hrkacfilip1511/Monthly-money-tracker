const createExpenseSlice = (set, get) => ({
  budget: 0.0,
  expenses: [],
  lastMonthBalance: 0.0,
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
  updateExpense: (id, description, amount, date) => {
    const expenses = get().expenses.map((expense) => {
      return expense.id === id
        ? {
            ...expense,
            id: id,
            description: description,
            amount: amount,
            date: date,
          }
        : expense;
    });

    set({ expenses: expenses });
    set({
      thisMonthCosts: get().expenses.reduce(
        (acc, curr) => acc + curr.amount,
        0
      ),
    });
  },
  setLastMonthBalance: (lastBalance) => {
    set({ lastMonthBalance: lastBalance });
  },
});

export default createExpenseSlice;
