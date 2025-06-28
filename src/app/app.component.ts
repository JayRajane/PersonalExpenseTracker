// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    ExpenseFormComponent,
    ExpenseSummaryComponent,
    ExpenseListComponent
  ]
})
export class AppComponent {
  title = 'Personal Expense Tracker';

  onExpenseAdded() {
    // Implementation for expense added event
  }
}