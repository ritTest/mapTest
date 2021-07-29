import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAgmExampleComponent } from './my-agm-example.component';

describe('MyAgmExampleComponent', () => {
  let component: MyAgmExampleComponent;
  let fixture: ComponentFixture<MyAgmExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAgmExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAgmExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
