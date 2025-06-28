// expense-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  selectedCategory = '';
  searchText = '';
  sortField: keyof Expense = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';
  categories: string[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.categories = this.expenseService.getCategories();
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.getExpenses();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredExpenses = [...this.expenses];

    if (this.selectedCategory) {
      this.filteredExpenses = this.filteredExpenses.filter(
        e => e.category === this.selectedCategory
      );
    }

    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      this.filteredExpenses = this.filteredExpenses.filter(
        e => e.description.toLowerCase().includes(searchLower)
      );
    }

    this.filteredExpenses.sort((a, b) => {
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];

      if (this.sortField === 'amount' || this.sortField === 'id') {
        // Handle numeric fields (amount, id)
        const numA = typeof valueA === 'number' ? valueA : 0;
        const numB = typeof valueB === 'number' ? valueB : 0;
        return this.sortDirection === 'asc' ? numA - numB : numB - numA;
      } else {
        // Handle string fields (date, category, description)
        const strA = typeof valueA === 'string' ? valueA : '';
        const strB = typeof valueB === 'string' ? valueB : '';
        return this.sortDirection === 'asc'
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id);
      this.loadExpenses();
    }
  }

  onEdit(expense: Expense): void {
    // This will be handled by parent component
  }

  toggleSort(field: keyof Expense): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }
}