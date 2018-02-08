import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  styles: [`
    /*button {margin: 0; width: 25px; height: 25px; padding: 0;}*/
    input {margin: 0; width: 25px; height: 25px; padding: 0;}
    .btn {background-color: white;}
    .bomb {background-color: red;}
    .play{text-align: center; padding: 10px 10px 10px 10px; height: 50px; width: 75px;}
    `],
  template:`
    <div>
      <button class="play" (click)="newGame()">New Game</button>
      <table align="center" border="1">
        <tr *ngFor="let i of [0,1,2,3,4,5,6,7]">
          <td *ngFor="let j of [0,1,2,3,4,5,6,7]">
            <div *ngIf="placeBomb(i,j)">
              <app-button [bomb]="true" [newGame]="resetValue" [bombsArray]="bombsArray" [x]="i" [y]="j"></app-button>
<!--              <input type="button" class="bomb" (contextmenu)="onRightClick($event)" (click)="check(i,j)" [ngStyle]="{'background-color': buttonColor}">-->
            </div>
            <div *ngIf="!placeBomb(i,j)">
              <app-button [bomb]="false" [newGame]="resetValue" [bombsArray]="bombsArray" [x]="i" [y]="j"></app-button>
              <!-- <button class="btn" (click)="check(i,j)" [ngStyle]="{'background-color': buttonColor}"></button>-->
<!--              <input type="button" value="" id="{{i}}{{j}}" class="btn" (click)="onClick($event,i,j)">-->
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
  resetValue;
  clicked = false;
 // num = '';
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

/*  onRightClick() {
    this.buttonColor = 'yellow';
    return false;
  }*/

/*  onClick(event, x: number, y: number) {
    var target = event.target;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var valueAttr = target.attributes.value;
    var val = valueAttr.nodeValue;
    // alert(val);
    alert(value);
    this.check(x,y);
  }*/

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

/*  check(x: number, y: number) {
    const couple = [x, y];
    alert(couple);
//     alert(y);
   this.clicked = true;
    /!*for (let index = 0; index < this.bombsArray.length; index++) {
      if (this.equals(this.bombsArray[index], couple)) {
        this.buttonColor = 'red';
        // this.isPlaying = false;
      //  this.isActive = true;
        // alert('BOOM');
        break;
      }
    }*!/
  }*/

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

  newGame() {
    this.ngOnInit();
    this.buttonColor = '#ffffff';
    this.resetValue = true;
    // this.num = '';
  }
/*
  showCell(x: number, y:number) {
    let bombCounter = 0;
    for(let i = x-1; i < x+1; i++){
      for(let j = y-1; j < y+1; j++){
        if (i >= 0 && j >= 0 && (i != x || j != y)) {
          bombCounter++;
        }
      }
    }*/
    //this.num = bombCounter;
  }
