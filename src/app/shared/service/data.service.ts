import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    return{
      tasks: [{
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        done: false
      }, {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        done: true
      }, {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        done: false
      }]
    }
  }
}
