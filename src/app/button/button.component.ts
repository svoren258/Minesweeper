// Instead of commenting on separate things, here's a summary:
// * There's an `assets` directory in `{{PROJECT_ROOT}}/src` -- no need to use external hosts for images, etc.
// * Mutating the arrays in `WindowService`'s properties without the service's knowledge breaks encapsulation in a major and unsafe way.
// * Directly mutating DOM should be avoided if possible. The data flow -- in informal, intuitive terms -- should be as follows:
//   1. The view catches an event and triggers an event handler.
//   2. The event handler changes the data model.
//   3. Angular notices the data model's change and automatically re-renders the template with new data.
// * Most components should be as "dumb" as possible and ideally only contain logic that deals with data visualization, *not* data
//   manipulation or storage -- that's what services are for. Otherwise the app's source becomes a hell to maintain very quickly.
// * JavaScript may not be as heavily armed as e.g. Python, but it's far from C -- when it comes to both language features and standard
//   library. MDN is a great resource for that. Have a look at array methods in particular, mainly `map`, `filter`, `reduce`, `find`, `some`
//   and `every` -- most of the for-loops in your code could be replaced by more readable functional-style constructs.
import {Component, Input, OnInit} from '@angular/core';
import {WindowService} from "../window.service";

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
  @Input() width;
  @Input() height;
  @Input() bombsArray;
  @Input() bomb;
  @Input() cellArray;
  @Input() shownButtons = [];

  constructor(private windowService:WindowService) {}

  ngOnInit() {}

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

  onClick(x: number, y: number) {
    let styleVal = document.getElementById(x.toString() + ',' + y.toString()).style.background;
    if (!styleVal.localeCompare('url("https://raw.githubusercontent.com/svoren258/Minesweeper/master/bombflagged.gif")')) {
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
    this.windowService.evaluateGame();
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

  showCell(x: number, y:number) {
    let couple = [x,y];
    let bombCounter = 0;
    for(let i = x-1; i <= x+1; i++){
      for(let j = y-1; j <= y+1; j++){
        if (i > 0 && j > 0 && i <= this.width && j <= this.height && (i != x || j != y)) {
          if (this.windowService.isBomb(i,j)){
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
      for (let j = y-1; j <= y+1; j++) {
        if (i > 0 && j > 0 && i <= this.width && j <= this.height && (i != x || j != y)) {
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

  equals(arr1: any, arr2: any) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }
}
