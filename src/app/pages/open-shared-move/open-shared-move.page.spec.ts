import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenSharedMovePage } from './open-shared-move.page';

describe('OpenSharedMovePage', () => {
  let component: OpenSharedMovePage;
  let fixture: ComponentFixture<OpenSharedMovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSharedMovePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenSharedMovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
