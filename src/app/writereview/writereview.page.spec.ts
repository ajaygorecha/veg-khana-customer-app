import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WritereviewPage } from './writereview.page';

describe('WritereviewPage', () => {
  let component: WritereviewPage;
  let fixture: ComponentFixture<WritereviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritereviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WritereviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
