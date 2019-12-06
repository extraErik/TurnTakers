import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-takers',
  templateUrl: './takers.page.html',
  styleUrls: ['./takers.page.scss'],
})
export class TakersPage implements OnInit {

  items = [];

  constructor() { }

  ngOnInit() {
    this.items.push({id: 1, name: 'Item One'});
    this.items.push({id: 2, name: 'Item Two'});
    this.items.push({id: 3, name: 'Item Three'});
  }

}
