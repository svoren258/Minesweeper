import { Component, OnInit } from '@angular/core';
import { WindowService } from "../window.service";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent implements OnInit {

  //global variables declaration
  width = [];
  height = [];
  shownButtons = [];
  cellArray = [];
  bombsArray = [];
  indexArray = [];

  constructor(public windowService:WindowService) {}

  ngOnInit() {
    this.getState();
  }

  getState() {
    this.windowService.placeBombs();
    this.cellArray = this.windowService.getCellArray();
    this.bombsArray = this.windowService.getBombsArray();
    this.indexArray = this.windowService.getIndexArray();
    this.width = this.windowService.getWindowWidth();
    this.height = this.windowService.getWindowHeight();
    this.shownButtons = this.windowService.getShownButtons();
  }
}

