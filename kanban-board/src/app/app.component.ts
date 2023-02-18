import { CdkDragDrop, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from './task/task';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: Task[] = [
    {title: 'PLAT-12',description:'GOOD'},
    {title: 'PLAT-34',description:'BAD'},
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  drop(event: CdkDragDrop<Task[]>): void {
    if(event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }

  edit(list:string, task:Task): void {

  }
}
