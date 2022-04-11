import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealdealPage } from './mealdeal.page';

describe('MealdealPage', () => {
  let component: MealdealPage;
  let fixture: ComponentFixture<MealdealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealdealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealdealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
