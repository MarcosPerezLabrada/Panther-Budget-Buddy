export const validateTransactionForm = (form, type) => {
  const errors = {};

  if (!form.amount || parseFloat(form.amount) <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (!form.category && !form.source) {
    errors.category = `${type === "expense" ? "Category" : "Source"} is required`;
  }

  if (!form.description || form.description.trim() === "") {
    errors.description = "Description is required";
  }

  return errors;
};

export const validateCategoryForm = (name) => {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Category name is required";
  }

  if (name && name.length > 50) {
    errors.name = "Category name must be less than 50 characters";
  }

  return errors;
};

export const validateGoalForm = (form) => {
  const errors = {};

  if (!form.name || form.name.trim() === "") {
    errors.name = "Goal name is required";
  }

  if (!form.amount || parseFloat(form.amount) <= 0) {
    errors.amount = "Target amount must be greater than 0";
  }

  return errors;
};
