import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isNew: boolean = false;
  isSearch: boolean = false;

  myCollection: string[][] = [[]];

  @Input() isLoading!: boolean;
  @Output() isLoadingChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
