import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import {
  alphanumericKeyboard,
  alphanumericNordicKeyboard,
  extendedKeyboard,
  extendedNordicKeyboard,
  KeyboardLayout,
  numericKeyboard,
  phoneKeyboard
} from './layouts';

@Directive({
  selector: '[ng-virtual-onscreen-keyboard]'
})

export class NgVirtualOnScreenKeyboardDirective {
  private opened = false;
  private focus = true;
  private inputRefSet = false;

  @Input('ng-virtual-onscreen-keyboard') virtualKeyboardRef: VirtualKeyboardComponent;

  @HostListener('focus')
  onFocus() {
    if (this.virtualKeyboardRef.getKeyWasPressed()) {
      this.virtualKeyboardRef.setKeyWasPressed(false);
      return;
    }

    this.inputRefSet = true;
    this.virtualKeyboardRef.setInputRef(this.element.nativeElement);
  }

  public constructor(
    private element: ElementRef,
    private dialog: MatDialog,
  ) { }

}
