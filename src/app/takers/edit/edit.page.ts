import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TurnTaker } from '../turnTaker.model';
import { MyTurnTakersService } from 'src/app/services/my-turn-takers.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  turnTaker: TurnTaker;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private myTurnTakers: MyTurnTakersService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/takers');
        return;
      }
      const takerId = paramMap.get('id');
      this.turnTaker = this.myTurnTakers.getMyTurnTaker(takerId);
    });
  }

}
