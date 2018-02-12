import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {

  //global variables declaration
  minesCount = 10;
  width = Array.from(new Array(8), (x,i) => i+1);
  height = Array.from(new Array(8), (x,i) => i+1);
  shownButtons = [];
  cellArray = [];
  bombsArray = [];
  indexArray = [];

  constructor() {}

  initAll() {
    this.shownButtons = [];
    this.cellArray = [];
    this.bombsArray = [];
    this.indexArray = [];
  }

  isBomb(x: number, y: number) {
    const couple = [x,y];
    for (let idx = 0; idx < this.bombsArray.length; idx++) {
      if (this.equals(this.bombsArray[idx],couple)){
        return true;
      }
    }
    return false;
  }

  evaluateGame() {
    let newArray = [];
    for(let idx = 0; idx < this.cellArray.length; idx++) {
      if (!this.isBomb(this.cellArray[idx][0], this.cellArray[idx][1])) {
        newArray.push(this.cellArray[idx]);
      }
    }
    if (this.areEqualArrays(newArray, this.shownButtons)) {
      alert('YOU WIN!');
    }
    return;
  }

  areEqualArrays(arr1: any, arr2: any) {
    let found = false;
    for(let idx1 = 0; idx1 < arr1.length; idx1++) {
      for(let idx2 = 0; idx2 < arr2.length; idx2++) {
        if (this.equals(arr1[idx1], arr2[idx2])){
          if (found) {
            continue;
          }
          found = true;
        }
      }
      if (found) {
        found = false;
      }
      else {return false;}
    }
    return true;
  }

  getCellArray() {
    return this.cellArray;
  }

  getBombsArray() {
    return this.bombsArray;
  }

  getIndexArray() {
    return this.indexArray;
  }

  getWindowWidth() {
    return this.width;
  }

  getWindowHeight() {
    return this.height;
  }

  getShownButtons() {
    return this.shownButtons;
  }

  placeBombs() {
    let randomIdx;
    for (let x = 1; x <= this.width.length; x++) {
      for (let y = 1; y <= this.height.length; y++) {
        const couple = [x, y];
        this.cellArray.push(couple);
      }
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
