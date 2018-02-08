import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  styles:[`
    input {margin: 0; width: 25px; height: 25px; padding: 0;}
    .btn {background-color: white;}`],
  template:`<input id="" type="button" value=" {{newGame ? '' : value}} " class="btn" (click)="onClick($event,x,y)">`
})
export class ButtonComponent implements OnInit {

 @Input() x;
 @Input() y;
 @Input() bombsArray = [];
 @Input() newGame;
 value;

  constructor() { }

  ngOnInit() {

  }

  onClick(event, x: number, y: number) {
    var target = event.target;
    var idAttr = target.attributes.id;
   // alert(x);
    idAttr.nodeValue = x.toString()+y.toString();
    alert(idAttr.nodeValue);
//     var value = idAttr.nodeValue;
    var valueAttr = target.attributes.value;
//     var value = valueAttr.nodeValue;
    valueAttr.nodeValue = this.showCell(x,y);
    this.value = valueAttr.nodeValue;
  }

  showCell(x: number, y:number) {
    //alert('show cell');
    let bombCounter = 0;
    for(let i = x-1; i <= x+1; i++){
      for(let j = y-1; j <= y+1; j++){
        if (i >= 0 && j >= 0 && (i != x || j != y)) {
          if (this.isBomb(i,j)){
            bombCounter++;
          }
        }
      }
    }
    if (bombCounter === 0) {
      return '';
    }
    return bombCounter.toString();
    //alert(bombCounter);
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
