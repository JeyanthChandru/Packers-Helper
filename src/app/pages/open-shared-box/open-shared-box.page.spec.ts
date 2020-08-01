import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenSharedBoxPage } from './open-shared-box.page';

describe('OpenSharedBoxPage', () => {
  let component: OpenSharedBoxPage;
  let fixture: ComponentFixture<OpenSharedBoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSharedBoxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenSharedBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
