import { CdkDragDrop, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from '../task/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: '/kanan-board.component.html',
  styleUrls: ['./kanan-board.component.css']
})
export class KananBoard {
  todo: Task[] = [
    {title: 'PLAT-12',description:'GOOD' , priority:'high'},
    {title: 'PLAT-34',description:'BAD'},
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private dialog: MatDialog) {

  }

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

  edit(list:'done'|'todo'|'inProgress', task:Task): void {
    const dialogRef= this.dialog.open(TaskDialogComponent,{
      width: '270px',
      data: {
        task,
        enableDelete:true
      }
    } );
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => { 
        const dataList =this[list];
        const taskIndex =   dataList.indexOf(task);
        if(result.delete){
          dataList.splice(taskIndex,1);
        }
          else{
            dataList[taskIndex]=task;
          }
        }
      );

  }
  newTask() : void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    } );
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => { if (result.task.title!= null || result.task.title!= null) {this.todo.push(result.task)}} );
  }
}