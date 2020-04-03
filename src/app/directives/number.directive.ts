import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumber]'
})
export class NumberDirective {

  regexStr = '^[0-9]*$';
  constructor(private el: ElementRef) { }

  @Input() appNumber: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const e = event;
    if (this.appNumber) {

      //functional keys

      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        (e.keyCode == 65 && e.ctrlKey === true) ||
        (e.keyCode == 67 && e.ctrlKey === true) ||
        (e.keyCode == 86 && e.ctrlKey === true) ||
        (e.keyCode == 88 && e.ctrlKey === true) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
      }

      const ch = String.fromCharCode(e.keyCode);
      const regEx = new RegExp(this.regexStr);
      if (regEx.test(ch)) {
        return;
      }
      else {
        e.preventDefault();
      }
    }
  }

}

