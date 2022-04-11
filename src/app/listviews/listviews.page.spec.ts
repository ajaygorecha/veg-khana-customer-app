import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListviewsPage } from './listviews.page';

describe('ListviewsPage', () => {
  let component: ListviewsPage;
  let fixture: ComponentFixture<ListviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListviewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
