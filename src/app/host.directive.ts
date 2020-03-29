import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[host-container]',
})
export class HostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}