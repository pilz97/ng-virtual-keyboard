import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { VirtualKeyboardService } from './virtual-keyboard.service';
import { KeyPressInterface } from './key-press.interface';
import {
  keyboardCapsLockLayout,
  KeyboardLayout,
  alphanumericKeyboard,
  alphanumericNordicKeyboard,
  extendedKeyboard,
  extendedNordicKeyboard,
  numericKeyboard,
  phoneKeyboard
} from './layouts';

@Component({
  selector: 'virtual-keyboard',
  template: `
    <div class="container">
      <div fxLayout="column">
        <mat-form-field *ngIf="isDialog">
          <button class="close"
            (click)="close()"
          >
            <mat-icon>check</mat-icon>
          </button>
    
          <input type="{{type}}"
            matInput
            #keyboardInput
            (click)="updateCaretPosition()"
            [(ngModel)]="inputElement.nativeElement.value" placeholder="{{ placeholder }}"
            [maxLength]="maxLength" autofocus
          />
        </mat-form-field>
    
        <div fxLayout="row" fxLayoutAlign="center center"
          *ngFor="let row of layout; let rowIndex = index"
          [attr.data-index]="rowIndex"
        >
          <virtual-keyboard-key
            *ngFor="let key of row; let keyIndex = index"
            [key]="key"
            [disabled]="disabled"
            [attr.data-index]="keyIndex"
            (keyPress)="keyPress($event)"
          ></virtual-keyboard-key>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .close {
      position: relative;
      float: right;
      top: -16px;
      right: 0;
      margin-bottom: -40px;
    }
  
    .mat-input-container {
      margin: -16px 0;
      font-size: 32px;
    }
  
    .mat-input-element:disabled {
      color: currentColor;
    }

    :host /deep/ .mat-input-placeholder {
      top: 10px !important;
      font-size: 24px !important;
    }
  `]
})

export class VirtualKeyboardComponent implements OnInit, OnDestroy {
  @ViewChild('keyboardInput') keyboardInput: ElementRef;

  public inputElement: ElementRef;
  @Input() inputRef: any;
  @Input() selectContent: boolean = false;
  @Input() layout: KeyboardLayout | string;
  public isDialog: boolean = false;
  public placeholder: string;
  public type: string;
  public disabled: boolean;
  public maxLength: number|string;

  private caretPosition: number;
  private shift = false;

  /**
   * Helper method to set cursor in input to correct place.
   *
   * @param {HTMLInputElement|HTMLTextAreaElement}  input
   * @param {number}                                start
   * @param {number}                                end
   */
  private static setSelectionRange(
    input: any,
    start: number,
    end: number
  ): void {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);

    } else if (input.createTextRange) {
      const range = input.createTextRange();

      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  /**
   * Constructor of the class.
   *
   * @param {MatDialogRef<VirtualKeyboardComponent>} dialogRef
   * @param {VirtualKeyboardService}                 virtualKeyboardService
   */
  public constructor(
    public dialogRef: MatDialogRef<VirtualKeyboardComponent>,
    private virtualKeyboardService: VirtualKeyboardService
  ) { }

  /**
   * On init life cycle hook, this will do following:
   *  1) Set focus to virtual keyboard input field
   *  2) Subscribe to following
   *    2.1) Shift key, this is needed in keyboard event dispatches
   *    2.2) CapsLock key, this will change keyboard layout
   *    2.3) Caret position in virtual keyboard input
   *  3) Reset of possible previously tracked caret position
   */
  private keyboardInputRef: ElementRef;
  public ngOnInit(): void {
    if (!this.isDialog && this.virtualKeyboardService.dialogOpened) {
      return;
    }
    if (typeof this.layout === 'string' || this.layout instanceof String) {
      this.layout = this.getLayout();
    }

    if (!this.inputRef && !this.isDialog) {
      return;
    }
    else if (!this.isDialog) {
      this.keyboardInputRef = new ElementRef(this.inputRef);
      this.inputElement = new ElementRef(this.inputRef);
      this.inputElement.nativeElement.addEventListener('click', this.updateCaretPosition.bind(this));
    }
    this.doInit();    
  }

  private doInit() {
    if (!this.isDialog) {
      setTimeout(() => {
        this.focusInput();
      }, 150);
    }

    this.virtualKeyboardService.shift$.subscribe((shift: boolean) => {
      this.shift = shift;
    });

    this.virtualKeyboardService.capsLock$.subscribe((capsLock: boolean) => {
      this.layout = keyboardCapsLockLayout(<KeyboardLayout>this.layout, capsLock);
    });

    this.virtualKeyboardService.caretPosition$.subscribe((caretPosition: number) => {
      this.caretPosition = caretPosition;

      setTimeout(() => {
        VirtualKeyboardComponent.setSelectionRange(this.getKeyboardInput().nativeElement, caretPosition, caretPosition);
      }, 0);
    });
    this.maxLength = '';
    if (!this.selectContent && this.inputElement !== undefined) {
      if (this.inputElement.nativeElement.value.length) {
        this.virtualKeyboardService.setCaretPosition(this.inputElement.nativeElement.value.length);
      }
  
      this.maxLength = this.inputElement.nativeElement.maxLength > 0 ? this.inputElement.nativeElement.maxLength : '';  
    }

    this.checkDisabled();
  }

  focusInput() {
    if (!this.isDialog && this.virtualKeyboardService.dialogOpened) {
      return;
    }
    this.getKeyboardInput().nativeElement.focus();
    if (this.selectContent) {
      this.getKeyboardInput().nativeElement.select();
    }
  }

  private keyWasPressed: boolean = false;
  getKeyWasPressed(): boolean {
    return this.keyWasPressed;
  }

  setKeyWasPressed(value: boolean) {
    this.keyWasPressed = value;
  }

  setInputRef(ref) {
    if (!this.isDialog && this.virtualKeyboardService.dialogOpened) {
      return;
    }
    if (!!this.inputElement) {
      this.inputElement.nativeElement.removeEventListener('click', this.updateCaretPosition.bind(this));
    }
    this.keyboardInputRef = new ElementRef(ref);
    this.inputElement = new ElementRef(ref);
    this.inputElement.nativeElement.addEventListener('click', this.updateCaretPosition.bind(this));
    this.doInit();    
  }

  private getLayout(): KeyboardLayout {
    let layout;

    switch (this.layout) {
      case 'alphanumeric':
        layout = alphanumericKeyboard;
        break;
      case 'alphanumericNordic':
        layout = alphanumericNordicKeyboard;
        break;
      case 'extended':
        layout = extendedKeyboard;
        break;
      case 'extendedNordic':
        layout = extendedNordicKeyboard;
        break;
      case 'numeric':
        layout = numericKeyboard;
        break;
      case 'phone':
        layout = phoneKeyboard;
        break;
      default:
        layout = this.layout;
        break;
    }

    return layout;
  }

  private getKeyboardInput(): ElementRef {
    if (this.isDialog) {
      return this.keyboardInput;
    }
    return this.keyboardInputRef;
  }

  /**
   * On destroy life cycle hook, in this we want to reset virtual keyboard service states on following:
   *  - Shift
   *  - CapsLock
   */
  public ngOnDestroy(): void {
    this.virtualKeyboardService.reset();
  }

  /**
   * Method to close virtual keyboard dialog
   */
  public close(): void {
    this.dialogRef.close();
  }

  /**
   * Method to update caret position. This is called on click event in virtual keyboard input element.
   */
  public updateCaretPosition(): void {
    this.virtualKeyboardService.setCaretPosition(this.getKeyboardInput().nativeElement.selectionStart);
  }

  /**
   * Method to handle actual "key" press from virtual keyboard.
   *  1) Key is "Special", process special key event
   *  2) Key is "Normal"
   *    - Append this key value to input
   *    - Dispatch DOM events to input element
   *    - Toggle Shift key if it's pressed
   *
   * @param {KeyPressInterface} event
   */
  public keyPress(event: KeyPressInterface): void {
    this.keyWasPressed = true;
    if (event.special) {
      this.handleSpecialKey(event);
    } else {
      this.handleNormalKey(event.keyValue);

      this.dispatchEvents(event);

      // Toggle shift if it's activated
      if (this.shift) {
        this.virtualKeyboardService.toggleShift();
      }
    }

    this.checkDisabled();
  }

  /**
   * Method to check is virtual keyboard input is disabled.
   */
  private checkDisabled(): void {
    if (this.inputElement === undefined) {
      this.disabled = false;
      return;
    }

    const maxLength = this.inputElement.nativeElement.maxLength;
    const valueLength = this.inputElement.nativeElement.value.length;

    this.disabled = maxLength > 0 && valueLength >= maxLength;
  }

  /**
   * Method to handle "normal" key press event, this will add specified character to input value.
   *
   * @param {string}  keyValue
   */
  private handleNormalKey(keyValue: string): void {
    let value = '';

    if(this.inputElement === undefined) {
      return;
    }
    const { selectionStart, selectionEnd } = this.inputElement.nativeElement;
    if (selectionStart !== selectionEnd && selectionEnd > selectionStart) {
      const origValue = this.inputElement.nativeElement.value.toString();
      let newValue = origValue.substring(0, selectionStart) +
      origValue.substring(selectionEnd, origValue.length) ;
      this.inputElement.nativeElement.value = newValue;
    }

    // We have caret position, so attach character to specified position
    if (!isNaN(this.caretPosition)) {
      value = [
        this.inputElement.nativeElement.value.slice(0, this.caretPosition),
        keyValue,
        this.inputElement.nativeElement.value.slice(this.caretPosition)
      ].join('');

      // Update caret position
      this.virtualKeyboardService.setCaretPosition(this.caretPosition + 1);
    } else {
      value = `${this.inputElement.nativeElement.value}${keyValue}`;
    }

    // And finally set new value to input
    this.inputElement.nativeElement.value = value;
  }

  /**
   * Method to handle "Special" key press events.
   *  1) Enter
   *  2) Escape, close virtual keyboard
   *  3) Backspace, remove last character from input value
   *  4) CapsLock, toggle current layout state
   *  6) Shift, toggle current layout state
   *  5) SpaceBar
   */
  private handleSpecialKey(event: KeyPressInterface): void {
    switch (event.keyValue) {
      case 'Enter':
        this.close();
        break;
      case 'Escape':
        this.close();
        break;
      case 'Backspace':
        const currentValue = this.inputElement.nativeElement.value;

        // We have a caret position, so we need to remove char from that position
        const { selectionStart, selectionEnd } = this.inputElement.nativeElement;
        if (selectionStart !== selectionEnd && selectionEnd > selectionStart) {
          const origValue = this.inputElement.nativeElement.value.toString();
          let newValue = origValue.substring(0, selectionStart) +
          origValue.substring(selectionEnd, origValue.length) ;
          this.inputElement.nativeElement.value = newValue;
        }
        else if (!isNaN(this.caretPosition)) {
          // And current position must > 0
          if (this.caretPosition > 0) {
            const start = currentValue.slice(0, this.caretPosition - 1);
            const end = currentValue.slice(this.caretPosition);

            this.inputElement.nativeElement.value = `${start}${end}`;

            // Update caret position
            this.virtualKeyboardService.setCaretPosition(this.caretPosition - 1);
          }
        } else {
          this.inputElement.nativeElement.value = currentValue.substring(0, currentValue.length - 1);
        }
        // Set focus to keyboard input
        this.getKeyboardInput().nativeElement.focus();
        break;
      case 'CapsLock':
        this.virtualKeyboardService.toggleCapsLock();
        break;
      case 'Shift':
        this.virtualKeyboardService.toggleShift();
        break;
      case 'SpaceBar':
        this.handleNormalKey(' ');
        break;
    }
  }

  /**
   * Method to dispatch necessary keyboard events to current input element.
   *
   * @see https://w3c.github.io/uievents/tools/key-event-viewer.html
   *
   * @param {KeyPressInterface} event
   */
  private dispatchEvents(event: KeyPressInterface) {
    const eventInit: KeyboardEventInit = {
      bubbles: true,
      cancelable: true,
      shiftKey: this.shift,
      key: event.keyValue,
      code: `Key${event.keyValue.toUpperCase()}}`,
      location: 0
    };

    // Simulate all needed events on base element
    if (this.inputElement !== undefined) {
      this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', eventInit));
      this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keypress', eventInit));
      this.inputElement.nativeElement.dispatchEvent(new Event('input', {bubbles : true}));
      this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keyup', eventInit));
    }

    // And set focus to input
    this.getKeyboardInput().nativeElement.focus();
  }
}
