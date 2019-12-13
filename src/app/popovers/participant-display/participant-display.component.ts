import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-participant-display',
  templateUrl: './participant-display.component.html',
  styleUrls: ['./participant-display.component.scss'],
})
export class ParticipantDisplayComponent implements OnInit {

  participants: any;

  constructor(private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.participants = this.navParams.get('participants');
    console.log('in participant display component, participants=' + this.participants);
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }

}
