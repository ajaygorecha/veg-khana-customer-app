import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyacountPage } from './myacount.page';

describe('MyacountPage', () => {
  let component: MyacountPage;
  let fixture: ComponentFixture<MyacountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyacountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyacountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
