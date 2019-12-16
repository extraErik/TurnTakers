import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateEditTurnTakerComponent } from './create-edit-turn-taker.component';

describe('CreateEditTurnTakerComponent', () => {
  let component: CreateEditTurnTakerComponent;
  let fixture: ComponentFixture<CreateEditTurnTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditTurnTakerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditTurnTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
