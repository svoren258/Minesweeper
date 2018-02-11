import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent implements OnInit {

  //global variables declaration
  width = Array.from(new Array(8), (x,i) => i+1);
  height = Array.from(new Array(8), (x,i) => i+1);
  minesCount = 10;
  shownButtons = [];
  cellArray = [];
  bombsArray = [];
  indexArray = Array();

  constructor() {
  }

  ngOnInit() {
    this.placeBombs();
  }


  placeBombs() {
    let randomIdx;
    for (let x = 1; x <= this.width.length; x++) {
      for (let y = 1; y <= this.height.length; y++) {
        const couple = [x, y];
        this.cellArray.push(couple);
      }
    }

    if (this.indexArray) {
      this.indexArray = [];
      this.bombsArray = [];
    }

    while (this.indexArray.length < this.minesCount) {
      randomIdx = Math.floor(Math.random() * (this.height.length*this.width.length));
      if (!this.contains(this.indexArray, randomIdx)) {
        this.indexArray.push(randomIdx);
        this.bombsArray.push(this.cellArray[randomIdx]);
      }
    }
  }

  placeBomb(x: number, y: number) {
    const couple = [x, y];
    for (let index = 0; index < this.bombsArray.length; index++) {
      if (this.equals(this.bombsArray[index], couple)) {
        return true;
      }
    }
    return false;
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
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }
}

