import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewBoxPage } from './new-box.page';

describe('NewBoxPage', () => {
  let component: NewBoxPage;
  let fixture: ComponentFixture<NewBoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBoxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
