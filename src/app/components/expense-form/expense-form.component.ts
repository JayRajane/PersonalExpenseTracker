// expense-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ExpenseFormComponent {
  @Output() expenseAdded = new EventEmitter<void>();
  
  categories: string[];
  expense: Omit<Expense, 'id'> = {
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0]
  };
  isEditMode = false;
  editingId: number | null = null;

  constructor(private expenseService: ExpenseService) {
    this.categories = this.expenseService.getCategories();
  }

  onSubmit(): void {
    if (this.isEditMode && this.editingId !== null) {
      this.expenseService.updateExpense(this.editingId, this.expense);
    } else {
      this.expenseService.addExpense(this.expense);
    }
    this.resetForm();
    this.expenseAdded.emit();
  }

  resetForm(): void {
    this.expense = {
      description: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0]
    };
    this.isEditMode = false;
    this.editingId = null;
  }

  editExpense(expense: Expense): void {
    this.expense = { ...expense };
    this.isEditMode = true;
    this.editingId = expense.id;
  }
}