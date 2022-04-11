import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookabuffetPage } from './bookabuffet.page';

describe('BookabuffetPage', () => {
  let component: BookabuffetPage;
  let fixture: ComponentFixture<BookabuffetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookabuffetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookabuffetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
