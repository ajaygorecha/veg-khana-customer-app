import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookbuffetPage } from './bookbuffet.page';

describe('BookbuffetPage', () => {
  let component: BookbuffetPage;
  let fixture: ComponentFixture<BookbuffetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookbuffetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookbuffetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
