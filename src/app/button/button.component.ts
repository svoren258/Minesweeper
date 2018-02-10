import {Component, Input, Output, OnInit} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  styles:[`
    input {margin: 0; width: 25px; height: 25px; padding: 0;}
    .btn {background-color: white;}
    .bomb {background-color: white;}`],
  template:`<input id="{{x}},{{y}}" value="" type="button" [ngStyle]="{'background-color': buttonColor}" (contextmenu)="onRightClick($event)" (click)="onClick($event,x,y)">`
})
export class ButtonComponent implements OnInit {

 @Input() x;
 @Input() y;
 @Input() bombsArray;
 @Input() bomb;
 @Input() cellArray;
 @Input() newGame;
  value;
  buttonColor = 'white';
  shownButtons = [];

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

  onRightClick() {
    if (this.buttonColor === 'yellow') {
      this.buttonColor = 'white';
    }
    else {
      this.buttonColor = 'yellow';
    }
    return false;
  }

  onClick(event, x: number, y: number) {
   if (this.buttonColor === 'yellow') {
     return;
   }

   if (this.bomb) {
    for(let idx = 0; idx < this.bombsArray.length; idx++) {
      // alert('for');
     // alert(this.bombsArray[idx]);
      let bombElem = document.getElementById(this.bombsArray[idx]);
      bombElem.style.backgroundColor = 'red';
    }
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
    //if (!ret.localeCompare('0')) {
    valueAttr.nodeValue = this.showCell(x,y);

    //  this.value = valueAttr.nodeValue;
  }

  showCell(x: number, y:number) {
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
          if(this.wasShown(i,j)) {
            continue;
          }
          this.shownButtons.push(couple);


          //alert(cell.nodeValue);
          retVal = this.showCell(i,j);
          //alert('return value');
          //alert(retVal);
          if (retVal !== 0) {
            //let couple = [i,j];
            //alert(couple);
            //alert(retVal);
//            cell = document.getElementById(i.toString() + ',' + j.toString())
            //document.getElementById(i.toString() + ',' + j.toString()).nodeValue = retVal.toString();
            document.getElementById(i.toString() + ',' + j.toString()).setAttribute("value", retVal.toString());
//  cell.nodeValue = retVal.toString();

          }
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
