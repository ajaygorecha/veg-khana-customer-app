import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItmoptionsPage } from './itmoptions.page';

describe('ItmoptionsPage', () => {
  let component: ItmoptionsPage;
  let fixture: ComponentFixture<ItmoptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItmoptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItmoptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
