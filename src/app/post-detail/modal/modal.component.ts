import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  name: string = '';
  email: string = '';
  body: string = '';
  @ViewChild('modal') modal: MzModalComponent;
  @Output('addClicked') addClicked = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit() {
  }

  onAddClicked() {
    const comment = {
      name: this.name,
      email: this.email,
      body: this.body
    }
    this.addClicked.emit(comment);
  }

  open() {
    this.modal.openModal();
  }

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: .5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '100%',
    endingTop: '10%',
    ready: (modal, trigger) => {
      console.log(modal, trigger);
    },
    complete: () => { 
      this.name = '';
      this.email = '';
      this.body = '';
     } 
  };
}
