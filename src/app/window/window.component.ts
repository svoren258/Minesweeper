import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent implements OnInit {
  width = 8;
  height = 8;
  minesCount = 11;
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
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const couple = [x, y];
        this.cellArray.push(couple);
      }
    }

    if (this.indexArray) {
      this.indexArray = [];
      this.bombsArray = [];
    }

    while (this.indexArray.length < this.minesCount) {
      randomIdx = Math.floor(Math.random() * 64);
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

