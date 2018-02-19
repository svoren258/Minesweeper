import { Injectable } from '@angular/core';

// Please explicitly specify all methods' return types to enhance readability and type-safety.
@Injectable()
export class WindowService {

  // The `minesCount` property should be marked:
  // - `private`, since it's not used from outside of the class (mind that the default access level in TypeScript is `public`);
  // - `readonly` to explicitly denote that the property is never mutated.
  minesCount = 10;
  width = Array.from(new Array(8), (x,i) => i+1);
  height = Array.from(new Array(8), (x,i) => i+1);
  // The inferred types of the following 4 properties is `any[]`. Arrays of *what* do they hold? Please use type annotations to reduce the
  // code's ambiguity. Also, calling the below-defined `initAll` method in the constructor instead of manually setting the default values
  // here would reduce the code's duplicity rendering it more maintainable.
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

  // For more clarity, this method could be rewritten:
  // - using the ES6 for-of loop (check it out, but keep reading);
  // - using the `find` or the `some` array method (single-line, more elegant, more readable => recommended).
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

  // This method could be implemented in a significantly more readable manner using some sort of nested functional construct based on e.g.
  // the `every` and `some` array methods.
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

  // Java-style getters/setters are generally not used in JS/TS, since there's a language construct for that (see JavaScript `get`/`set`).
  // Also mind that the properties returned from the following bunch of getters are already `public`.
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

  // Okay, let me get this straight:
  // - `width` is an array of all possible indices on the x-axis;
  // - `height` is an array of all possible indices on the y-axis;
  // - `cellArray` is an array of all possible coordinates;
  // - `indexArray` is an array of indices on which the coordinates of bombs are located in `cellArray`;
  // - `bombsArray` is an array of coordinates of bombs;
  // - `shownButtons` is an array of uncovered fields.
  // Why such a complicated way of representing the minefield? Why not just think of it as a matrix of states? A matrix can easily be
  // represented by a 2D-array; the state -- since its a combination of several attributes -- by some sort of record type. In terms of
  // JS that's e.g. a simple array of arrays of objects; TS then introduces interfaces, enums etc. to enhance the data structure's
  // readability. Keep in mind that other people are going to read your code (including your future self) and it's sensible to design and
  // implement things in a way that's simple and intuitive in relation to which real-world entities they represent. Angular is usually
  // going to be helpful and make it easy to visualize well-designed models.
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

  // This doesn't seem to change the game's state in any way contrary to its name.
  placeBomb(x: number, y: number) {
    const couple = [x, y];
    for (let index = 0; index < this.bombsArray.length; index++) {
      if (this.equals(this.bombsArray[index], couple)) {
        return true;
      }
    }
    return false;
  }

  // This is a needless reimplementation of `arr.includes(item)` (ES2017+) or `arr.indexOf(item) !== -1` (ES5.1+).
  contains(arr: any, item: number) {
    for (let idx = 0; idx < arr.length; idx++) {
      if (arr[idx] === item) {
        return true;
      }
    }
    return false;
  }

  // This seems to be a comparison method specifically for doubles of some type T. Why not specify that using type annotations?
  equals(arr1: any, arr2: any) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }
}
