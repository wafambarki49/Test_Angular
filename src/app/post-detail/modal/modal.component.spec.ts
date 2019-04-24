import { TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { MzModalModule, MzInputModule, MzButtonModule } from 'ngx-materialize';
import { FormsModule } from '@angular/forms';

describe('Component: Modal', () => {

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[
        MzModalModule,
        FormsModule,
        MzInputModule,
        MzButtonModule
      ],
      declarations: [ModalComponent]
    });
  });

  it('should create the ModalComponent',() => {
    let fixture = TestBed.createComponent(ModalComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('mz-modal-header should display add Title',() => {
    let fixture = TestBed.createComponent(ModalComponent);
    let app = fixture.debugElement.componentInstance;
    let modalHeader = fixture.nativeElement.querySelector('mz-modal-header');
    expect(modalHeader.textContent).toContain('Add');
  });

  it('Modal should Have three inputs',() => {
    let fixture = TestBed.createComponent(ModalComponent);
    let app = fixture.debugElement.componentInstance;
    let inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(3);
  });

  it('Modal should Have Two buttons',() => {
    let fixture = TestBed.createComponent(ModalComponent);
    let app = fixture.debugElement.componentInstance;
    let buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

});
