import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  apiurl: string = 'api/tasks/';

  getTasks() {
    return this.http.get<Task[]>(this.apiurl);
  }
  getTask(id: number) {
    return this.http.get<Task>(this.apiurl + id);
  }
  createTask(task: Task) {
    return this.http.post(this.apiurl, task);
  }
  updateTask(task: Task) {
    return this.http.put(this.apiurl + task.id, task);
  }

  deleteTask(id: number) {
    return this.http.delete(this.apiurl + id);
  }
}
