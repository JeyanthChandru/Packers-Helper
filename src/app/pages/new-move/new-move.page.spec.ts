import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMovePage } from './new-move.page';

describe('NewMovePage', () => {
  let component: NewMovePage;
  let fixture: ComponentFixture<NewMovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMovePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
