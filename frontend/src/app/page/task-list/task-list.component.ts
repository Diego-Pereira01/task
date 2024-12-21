import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';  // Importar o CommonModule

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule]  // Adicionar CommonModule aos imports
})
export class TaskListComponent {
  newTask: string = '';
  newTaskDeadline: string = '';
  newTaskPriority: string = 'Baixa';
  tasks: { description: string, deadline: string, priority: string }[] = [];

  addTask() {
    if (this.newTask && this.newTaskDeadline && this.newTaskPriority) {
      this.tasks.push({ 
        description: this.newTask, 
        deadline: this.newTaskDeadline, 
        priority: this.newTaskPriority 
      });
      this.newTask = '';
      this.newTaskDeadline = '';
      this.newTaskPriority = 'Baixa';
    }
  }

  removeTask(task: { description: string, deadline: string, priority: string }) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }
}
