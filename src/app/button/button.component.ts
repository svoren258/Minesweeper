import {Component, Input, Output, OnInit} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
/*  styles:[`
    input {margin: 0; width: 20px; height: 20px; padding: 0;}
    .btn {background-color: white;}
    .bomb {background-color: white;}`],*/
/*  template:`<input id="{{x}},{{y}}" value="" type="button" [ngStyle]="{'background': 'url(' + bgImg + ')'}" (contextmenu)="onRightClick($event,x,y)" (click)="onClick($event,x,y)">`*/
})
export class ButtonComponent implements OnInit {

  bgImg = 'https://raw.githubusercontent.com/svoren258/Minesweeper/master/blank.gif';
  @Input() x;
 @Input() y;
 @Input() bombsArray;
 @Input() bomb;
 @Input() cellArray;
 @Input() newGame;
  value;
  buttonColor = 'white';
 @Input() shownButtons = [];

  constructor() {
  }

  ngOnInit() {

  }
/*
  setColor() {
    let cell;
    this.buttonColor = '#ffffff';/!*
    if (this.newGame) {
      this.newGame = false;
      /!*for (let idx = 0; idx < this.cellArray.length; idx++) {
        cell = document.getElementById(this.cellArray[idx]);
        cell.style.backgroundColor = this.buttonColor;
        cell.nodeValue = '';
      }*!/
    }*!/
      return this.buttonColor;
  }*/

  onRightClick(event, x, y) {
    var target = event.target;
    var style = target.attributes.style;
    var styleVal = style.nodeValue;
    //alert(styleVal);
    if (!styleVal.localeCompare('background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/blank.gif");')) {
      style.nodeValue = 'background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombflagged.gif");';
    }
    else {
      style.nodeValue = 'background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/blank.gif");';
    }
/*    if (this.buttonColor === 'yellow') {
      this.buttonColor = 'white';
    }
    else {
      this.buttonColor = 'yellow';
    }*/
    return false;
  }

  onClick(event, x: number, y: number) {
   var target = event.target;
   var style = target.attributes.style;
   var styleVal = style.nodeValue;
    if (!styleVal.localeCompare('background: url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombflagged.gif");')) {
     return;
   }

   if (this.bomb) {
    for(let idx = 0; idx < this.bombsArray.length; idx++) {
      // alert('for');
      document.getElementById(this.bombsArray[idx]).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombrevealed.gif")';
     // alert(this.bombsArray[idx]);
     /* let bombElem = document.getElementById(this.bombsArray[idx]);
      bombElem.style.backgroundColor = 'red';*/
    }
    document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombdeath.gif")';
     alert('YOU LOOSE!');
     return;
   }

   // alert(this.getIdAttrValue(event));
    var target = event.target;
    var idAttr = target.attributes.id;
   // idAttr.nodeValue = x.toString()+y.toString();
    //alert(idAttr.nodeValue);

//     var value = idAttr.nodeValue;
    var valueAttr = target.attributes.value;
//     var value = valueAttr.nodeValue;
    //let ret = this.showCell(x,y);
    //alert(ret);
    let ret = this.showCell(x,y);
    //alert(ret);
/*    if (!ret.localeCompare('0')) {
//      valueAttr.nodeValue = '';
        document.getElementById(x.toString() + ',' + y.toString()).style.background = 'url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/open0.gif")';
    }
    else {
     this.setNum(ret,x,y);
      //valueAttr.nodeValue = ret;
    }*/
    this.setNum(ret,x,y);
    //  this.value = valueAttr.nodeValue;
    this.evaluateGame();
  }

  setNum(ret,x,y) {
 /*   var target = event.target;
    var backgroundAttr = target.attributes.style;*/
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
    let newArray = []
  //  alert('evaluate');
    let found = false;
    for(let idx = 0; idx < this.cellArray.length; idx++) {
      if (this.isBomb(this.cellArray[idx][0], this.cellArray[idx][1])) {
        continue;
      }
      else {
        newArray.push(this.cellArray[idx]);
      }
    }
   // alert(newArray);
    //alert(this.shownButtons);
    //alert(this.shownButtons);
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
//      alert('null');
     // let couple = [x,y];
//      alert(couple);
      this.showCells(x,y);
      //return '';
    }
/*    if (!this.wasShown((x,y))) {
      let couple = [x,y];
      this.shownButtons.push(couple);
    }*/
    this.shownButtons.push(couple);
    return bombCounter.toString();
    //alert(bombCounter);
  }

  showCells(x:number, y:number) {
    //alert('showCells');
    let retVal;
    let cell;
    for(let i = x-1; i <= x+1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && j >= 0 && i < 8 && j < 8 && (i != x || j != y)) {
          let couple = [i,j];
         // alert(couple);
          //console.log(couple);
          if(this.wasShown(i,j)) {
            continue;
          }
          this.shownButtons.push(couple);

          //alert(cell.nodeValue);
          retVal = this.showCell(i,j);
          //alert('return value');
          //console.log(retVal);
         // alert(retVal);
         //if (retVal.localeCompare('0') != 0) {
            //let couple = [i,j];
            //alert(couple);
            //alert(retVal);
//            cell = document.getElementById(i.toString() + ',' + j.toString())
            //document.getElementById(i.toString() + ',' + j.toString()).nodeValue = retVal.toString();
          this.setNum(retVal,i,j);
            //document.getElementById(i.toString() + ',' + j.toString()).setAttribute("value", retVal.toString());
//  cell.nodeValue = retVal.toString();

         // }
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
    if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) {
      return true;
    }
    return false;
  }
}
