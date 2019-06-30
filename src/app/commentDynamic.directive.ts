import {  ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[ad-post]',
})
export class CDDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}