// Form validation utilities

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateAccountNo(value: string): string | null {
  if (!value) return 'Account number is required';
  if (!/^\d+$/.test(value)) return 'Account number must contain only digits';
  if (value.length < 4) return 'Account number must be at least 4 digits';
  return null;
}

export function validateAmount(value: string): string | null {
  if (!value) return 'Amount is required';
  const amount = parseFloat(value);
  if (isNaN(amount)) return 'Please enter a valid number';
  if (amount <= 0) return 'Amount must be greater than zero';
  return null;
}

export function validateName(value: string): string | null {
  if (!value || value.trim() === '') return 'Name is required';
  if (value.trim().length < 2) return 'Name must be at least 2 characters';
  if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name must contain only letters';
  return null;
}

export function validateEmail(value: string): string | null {
  if (!value) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return null;
}
