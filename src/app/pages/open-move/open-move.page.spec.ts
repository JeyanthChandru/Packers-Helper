import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenMovePage } from './open-move.page';

describe('OpenMovePage', () => {
  let component: OpenMovePage;
  let fixture: ComponentFixture<OpenMovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMovePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenMovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
