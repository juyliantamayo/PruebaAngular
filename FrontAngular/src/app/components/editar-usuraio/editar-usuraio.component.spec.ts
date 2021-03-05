import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuraioComponent } from './editar-usuraio.component';

describe('EditarUsuraioComponent', () => {
  let component: EditarUsuraioComponent;
  let fixture: ComponentFixture<EditarUsuraioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUsuraioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuraioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
