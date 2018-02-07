import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  styles: [`
    button {margin: 0; width: 25px; height: 25px; padding: 0;}
    /*button.btn {background-color: white;}
    button.bomb {background-color: red;}*/
    `],
  template: `
    <div>
      <table align="center">
        <tr *ngFor="let i of [0,1,2,3,4,5,6,7]">
          <td *ngFor="let j of [0,1,2,3,4,5,6,7]">
            <div *ngIf="placeBomb(i,j)">
              <button class="bomb" (click)="check(i,j)" [ngStyle]="{'background-color': buttonColor}"></button>
            </div>
            <div *ngIf="!placeBomb(i,j)">
              <!-- <button class="btn" (click)="check(i,j)" [ngStyle]="{'background-color': buttonColor}"></button>-->
              <button class="btn" (click)="check(i,j)"></button>
            </div>
          </td>
        </tr>
      </table>
    </div>`
})

export class WindowComponent implements OnInit {
  width = 8;
  height = 8;
  minesCount = 11;
  cellArray = [];
  bombsArray = [];
  indexArray = Array();
  buttonColor = '#FFFFFF';
  isActive = false;
  // isPlaying = true;
  // paragraph = `<p>some text</p>`;
  // button = `<button class="btn" (click)="check(i,j)" [ngStyle]="{'background-color': buttonColor}"></button>`;
  // button = 'x';

  constructor() {
  }

  ngOnInit() {
    this.placeBombs();
  }

  placeBombs() {
    // let isBomb = false;
    let randomIdx;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const couple = [x, y];
        this.cellArray.push(couple);

//        alert(this.cellArray.length);
      }
    }
    while (this.indexArray.length < this.minesCount) {
      randomIdx = Math.floor(Math.random() * 64);
      if (!this.contains(this.indexArray, randomIdx)) {
        this.indexArray.push(randomIdx);
        this.bombsArray.push(this.cellArray[randomIdx]);
        // isBomb = true;
      }

    }

    alert(this.bombsArray);
   // this.createButton(this.cellArray, this.indexArray);
  }

  placeBomb(x: number, y: number) {
    const couple = [x, y];
   // alert(couple);
//     alert(y);
    for (let index = 0; index < this.bombsArray.length; index++) {
      if (this.equals(this.bombsArray[index], couple)) {
        //this.buttonColor = '#000000';
        // this.isPlaying = false;
        return true;
      }
    }
    return false;
  }

  check(x: number, y: number) {
    const couple = [x, y];
    alert(couple);
//     alert(y);
    for (let index = 0; index < this.bombsArray.length; index++) {
      if (this.equals(this.bombsArray[index], couple)) {
        this.buttonColor = '#000000';
        // this.isPlaying = false;
      //  this.isActive = true;
        // alert('BOOM');
        break;
      }
    }
  }

  contains(arr: any, item: number) {
    for (let idx = 0; idx < arr.length; idx++) {
      if (arr[idx] === item) {
        return true;
      }
    }
    return false;
  }

  equals(arr1: any, arr2: any) {
    if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) {
      return true;
    }
    return false;
  }

  //createButton(board: any, idxArr: any) {
    //for (let idx = 0; idx < board.length; idx++) {
      //if (this.contains(idxArr, idx)) {
        //this.button = `<button class="bomb"></button>`;
      //}
      //alert(this.button);
    //}
  //}
}
