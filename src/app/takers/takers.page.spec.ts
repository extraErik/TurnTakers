import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakersPage } from './takers.page';

describe('TakersPage', () => {
  let component: TakersPage;
  let fixture: ComponentFixture<TakersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
