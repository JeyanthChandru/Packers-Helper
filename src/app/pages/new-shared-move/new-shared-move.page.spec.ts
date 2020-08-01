import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSharedMovePage } from './new-shared-move.page';

describe('NewSharedMovePage', () => {
  let component: NewSharedMovePage;
  let fixture: ComponentFixture<NewSharedMovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSharedMovePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSharedMovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
