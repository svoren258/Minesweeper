import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  //global variables declarations
  bgImg = 'https://raw.githubusercontent.com/svoren258/Minesweeper/master/blank.gif';

  @Input() x;
  @Input() y;
  @Input() bombsArray;
  @Input() bomb;
  @Input() cellArray;
  @Input() shownButtons = [];

  constructor() {
  }

  ngOnInit() {

  }

  onRightClick(event) {
    let target = event.target;
    let style = target.attributes.style;
    let styleVal = style.nodeValue;
    if (!styleVal.localeCompare('background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/blank.gif");')) {
      style.nodeValue = 'background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombflagged.gif");';
    }
    else {
      style.nodeValue = 'background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/blank.gif");';
    }
    return false;
  }

  onClick(event, x: number, y: number) {
    let target = event.target;
    let style = target.attributes.style;
    let styleVal = style.nodeValue;
    if (!styleVal.localeCompare('background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombflagged.gif");')) {
     return;
    }

    if (this.bomb) {
      for(let idx = 0; idx < this.bombsArray.length; idx++) {
        document.getElementById(this.bombsArray[idx]).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombrevealed.gif")';
      }
      document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombdeath.gif")';
      alert('YOU LOOSE!');
      return;
    }

    let ret = this.showCell(x,y);
    this.setNum(ret,x,y);
    this.evaluateGame();
  }

  setNum(ret,x,y) {
    switch(ret) {
      case '0':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open0.gif")';
        break;
      case '1':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open1.gif")';
        break;
      case '2':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open2.gif")';
        break;
      case '3':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open3.gif")';
        break;
      case '4':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open4.gif")';
        break;
      case '5':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open5.gif")';
        break;
      case '6':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open6.gif")';
        break;
      case '7':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open7.gif")';
        break;
      case '8':
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open8.gif")';
        break;
    }
  }

  evaluateGame() {
    let newArray = [];
    let found = false;
    for(let idx = 0; idx < this.cellArray.length; idx++) {
      if (!this.isBomb(this.cellArray[idx][0], this.cellArray[idx][1])) {
        newArray.push(this.cellArray[idx]);
      }
    }

    for(let idx1 = 0; idx1 < newArray.length; idx1++) {
      for(let idx2 = 0; idx2 < this.shownButtons.length; idx2++) {
        if (this.equals(newArray[idx1], this.shownButtons[idx2])){
          if (found) {
            continue;
          }
          found = true;
        }
      }
      if (found) {
        found = false;
      }
      else {return;}
    }
    alert('YOU WIN!');
    return;
  }

  showCell(x: number, y:number) {
    let couple = [x,y];
    let bombCounter = 0;
    for(let i = x-1; i <= x+1; i++){
      for(let j = y-1; j <= y+1; j++){
        if (i >= 0 && j >= 0 && i < 8 && j < 8 && (i != x || j != y)) {
          if (this.isBomb(i,j)){
            bombCounter++;
          }
        }
      }
    }
    if (bombCounter === 0) {
      this.showCells(x,y);
    }

    this.shownButtons.push(couple);
    return bombCounter.toString();
  }

  showCells(x: number, y: number) {
    let retVal;
    for(let i = x-1; i <= x+1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && j >= 0 && i < 8 && j < 8 && (i != x || j != y)) {
          let couple = [i,j];
          if(this.wasShown(i,j)) {
            continue;
          }
          this.shownButtons.push(couple);
          retVal = this.showCell(i,j);
          this.setNum(retVal,i,j);
        }
      }
    }
  }

  wasShown(x:number, y:number) {
    let couple = [x,y];
    for(let idx = 0; idx < this.shownButtons.length; idx++) {
      if (this.equals(this.shownButtons[idx], couple)) {
        return true;
      }
    }
    return false;
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

  equals(arr1: any, arr2: any) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }
}
