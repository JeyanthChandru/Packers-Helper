import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenBoxPage } from './open-box.page';

describe('OpenBoxPage', () => {
  let component: OpenBoxPage;
  let fixture: ComponentFixture<OpenBoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenBoxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
