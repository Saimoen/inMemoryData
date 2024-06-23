
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { TaskService } from '../../shared/service/task.service';
import { Task } from '../../shared/model/Task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  taskList!: Task[];
  datasource: any;
  displayedColumns: string[] = ['id', 'title', 'description', 'done', 'action'];
  editdata!: Task;
  isAddTask = false;
  isEditTask = false;

  constructor(private taskService: TaskService, private builder: FormBuilder) {}

  taskForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    done: this.builder.control(false),
  });

  ngOnInit(): void {
    this.loadTaskList();
  }

  loadTaskList() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.taskList = data;
      this.datasource = new MatTableDataSource<Task>(this.taskList);
    });
  }

  toggleTaskStatus(task: Task) {
    // task.done = !task.done;
    // this.taskService.updateTask(task).subscribe();
  }

  backToList() {
    this.isAddTask = false;
    this.isEditTask = false;
  }

  addTask() {
    this.taskForm.reset();
    this.isAddTask = true;
  }

  editTask(id: number) {
    this.taskService.getTask(id).subscribe((data: Task) => {
      this.editdata = data;
      this.taskForm.setValue({
        id: this.editdata.id,
        title: this.editdata.title,
        description: this.editdata.description,
        done: this.editdata.done,
      });
      this.isEditTask = true;
    });
  }

  deleteTask(id: number) {
    if(confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe((data: any) => {
        this.loadTaskList();
        alert('Tâche supprimée avec succès !');
      });
    }
  }

  saveTask() {
    if (this.taskForm.valid) {
      let _obj: Task = {
        id: this.taskForm.value.id as number,
        title: this.taskForm.value.title as string,
        description: this.taskForm.value.description as string,
        done: this.taskForm.value.done as boolean,
      };
      if(this.isAddTask){
        this.taskService.createTask(_obj).subscribe((data: any) => {
          this.loadTaskList();
          alert('Tâche ajoutée avec succès !');
        });
      } else {
        _obj.id = this.taskForm.getRawValue().id as number;
        this.taskService.updateTask(_obj).subscribe((data: any) => {
          this.loadTaskList();
          alert('Tâche modifiée avec succès !');
        });
      }
      this.backToList();
    }
  }
}
