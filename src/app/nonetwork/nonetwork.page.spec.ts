import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NonetworkPage } from './nonetwork.page';

describe('NonetworkPage', () => {
  let component: NonetworkPage;
  let fixture: ComponentFixture<NonetworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonetworkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NonetworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
