import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirectiveDirective {
  @HostBinding('class.open') isToggled: boolean = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('click')
  Onclick() {
    this.isToggled = !this.isToggled;
  }
}
