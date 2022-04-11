import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemsearchPage } from './itemsearch.page';

describe('ItemsearchPage', () => {
  let component: ItemsearchPage;
  let fixture: ComponentFixture<ItemsearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
