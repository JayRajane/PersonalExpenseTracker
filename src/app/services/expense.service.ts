import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private readonly STORAGE_KEY = 'expense-tracker-expenses';
  private readonly CATEGORIES = [
    'Food',
    'Transport',
    'Entertainment',
    'Bills',
    'Shopping',
    'Healthcare',
    'Education',
    'Other'
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  getCategories(): string[] {
    return this.CATEGORIES;
  }

  getExpenses(): Expense[] {
    return [...this.expenses];
  }

  addExpense(expense: Omit<Expense, 'id'>): void {
    const newExpense: Expense = {
      ...expense,
      id: Date.now() // Simple unique ID
    };
    this.expenses.push(newExpense);
    this.saveToLocalStorage();
  }

  updateExpense(id: number, updatedExpense: Omit<Expense, 'id'>): void {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      this.expenses[index] = { ...updatedExpense, id };
      this.saveToLocalStorage();
    }
  }

  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter(e => e.id !== id);
    this.saveToLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.expenses = JSON.parse(data);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.expenses));
  }
}