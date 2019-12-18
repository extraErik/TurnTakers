import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-participant-display',
  templateUrl: './participant-display.component.html',
  styleUrls: ['./participant-display.component.scss'],
})
export class ParticipantDisplayComponent implements OnInit {

  //
  //
  // TODO: eliminate this component if determined it is not needed
  // (but keep for a while as example of how to implement popover)
  //
  //

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
