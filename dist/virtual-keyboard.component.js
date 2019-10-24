"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var virtual_keyboard_service_1 = require("./virtual-keyboard.service");
var layouts_1 = require("./layouts");
var VirtualKeyboardComponent = /** @class */ (function () {
    /**
     * Constructor of the class.
     *
     * @param {MatDialogRef<VirtualKeyboardComponent>} dialogRef
     * @param {VirtualKeyboardService}                 virtualKeyboardService
     */
    function VirtualKeyboardComponent(dialogRef, virtualKeyboardService) {
        this.dialogRef = dialogRef;
        this.virtualKeyboardService = virtualKeyboardService;
        this.isDialog = false;
        this.shift = false;
    }
    /**
     * Helper method to set cursor in input to correct place.
     *
     * @param {HTMLInputElement|HTMLTextAreaElement}  input
     * @param {number}                                start
     * @param {number}                                end
     */
    VirtualKeyboardComponent.setSelectionRange = function (input, start, end) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(start, end);
        }
        else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    };
    VirtualKeyboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (typeof this.layout === 'string' || this.layout instanceof String) {
            console.log('serach keyboard layout');
            this.layout = this.getLayout();
        }
        if (!this.isDialog) {
            this.keyboardInputRef = new core_1.ElementRef(this.inputRef);
            this.inputElement = new core_1.ElementRef(this.inputRef);
        }
        setTimeout(function () {
            _this.getKeyboardInput().nativeElement.focus();
        }, 0);
        this.virtualKeyboardService.shift$.subscribe(function (shift) {
            _this.shift = shift;
        });
        this.virtualKeyboardService.capsLock$.subscribe(function (capsLock) {
            _this.layout = layouts_1.keyboardCapsLockLayout(_this.layout, capsLock);
        });
        this.virtualKeyboardService.caretPosition$.subscribe(function (caretPosition) {
            _this.caretPosition = caretPosition;
            setTimeout(function () {
                VirtualKeyboardComponent.setSelectionRange(_this.getKeyboardInput().nativeElement, caretPosition, caretPosition);
            }, 0);
        });
        this.maxLength = '';
        if (this.inputElement !== undefined) {
            if (this.inputElement.nativeElement.value.length) {
                this.virtualKeyboardService.setCaretPosition(this.inputElement.nativeElement.value.length);
            }
            this.maxLength = this.inputElement.nativeElement.maxLength > 0 ? this.inputElement.nativeElement.maxLength : '';
        }
        this.checkDisabled();
    };
    VirtualKeyboardComponent.prototype.getLayout = function () {
        var layout;
        switch (this.layout) {
            case 'alphanumeric':
                layout = layouts_1.alphanumericKeyboard;
                break;
            case 'alphanumericNordic':
                layout = layouts_1.alphanumericNordicKeyboard;
                break;
            case 'extended':
                layout = layouts_1.extendedKeyboard;
                break;
            case 'extendedNordic':
                layout = layouts_1.extendedNordicKeyboard;
                break;
            case 'numeric':
                layout = layouts_1.numericKeyboard;
                break;
            case 'phone':
                layout = layouts_1.phoneKeyboard;
                break;
            default:
                layout = this.layout;
                break;
        }
        return layout;
    };
    VirtualKeyboardComponent.prototype.getKeyboardInput = function () {
        if (this.isDialog) {
            return this.keyboardInput;
        }
        return this.keyboardInputRef;
    };
    /**
     * On destroy life cycle hook, in this we want to reset virtual keyboard service states on following:
     *  - Shift
     *  - CapsLock
     */
    VirtualKeyboardComponent.prototype.ngOnDestroy = function () {
        this.virtualKeyboardService.reset();
    };
    /**
     * Method to close virtual keyboard dialog
     */
    VirtualKeyboardComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    /**
     * Method to update caret position. This is called on click event in virtual keyboard input element.
     */
    VirtualKeyboardComponent.prototype.updateCaretPosition = function () {
        this.virtualKeyboardService.setCaretPosition(this.getKeyboardInput().nativeElement.selectionStart);
    };
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
    VirtualKeyboardComponent.prototype.keyPress = function (event) {
        if (event.special) {
            this.handleSpecialKey(event);
        }
        else {
            this.handleNormalKey(event.keyValue);
            this.dispatchEvents(event);
            // Toggle shift if it's activated
            if (this.shift) {
                this.virtualKeyboardService.toggleShift();
            }
        }
        this.checkDisabled();
    };
    /**
     * Method to check is virtual keyboard input is disabled.
     */
    VirtualKeyboardComponent.prototype.checkDisabled = function () {
        if (this.inputElement === undefined) {
            this.disabled = false;
            return;
        }
        var maxLength = this.inputElement.nativeElement.maxLength;
        var valueLength = this.inputElement.nativeElement.value.length;
        this.disabled = maxLength > 0 && valueLength >= maxLength;
    };
    /**
     * Method to handle "normal" key press event, this will add specified character to input value.
     *
     * @param {string}  keyValue
     */
    VirtualKeyboardComponent.prototype.handleNormalKey = function (keyValue) {
        var value = '';
        if (this.inputElement === undefined) {
            return;
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
        }
        else {
            value = "" + this.inputElement.nativeElement.value + keyValue;
        }
        // And finally set new value to input
        this.inputElement.nativeElement.value = value;
    };
    /**
     * Method to handle "Special" key press events.
     *  1) Enter
     *  2) Escape, close virtual keyboard
     *  3) Backspace, remove last character from input value
     *  4) CapsLock, toggle current layout state
     *  6) Shift, toggle current layout state
     *  5) SpaceBar
     */
    VirtualKeyboardComponent.prototype.handleSpecialKey = function (event) {
        switch (event.keyValue) {
            case 'Enter':
                this.close();
                break;
            case 'Escape':
                this.close();
                break;
            case 'Backspace':
                if (this.isDialog) {
                    var currentValue = this.inputElement.nativeElement.value;
                    // We have a caret position, so we need to remove char from that position
                    if (!isNaN(this.caretPosition)) {
                        // And current position must > 0
                        if (this.caretPosition > 0) {
                            var start = currentValue.slice(0, this.caretPosition - 1);
                            var end = currentValue.slice(this.caretPosition);
                            this.inputElement.nativeElement.value = "" + start + end;
                            // Update caret position
                            this.virtualKeyboardService.setCaretPosition(this.caretPosition - 1);
                        }
                    }
                    else {
                        this.inputElement.nativeElement.value = currentValue.substring(0, currentValue.length - 1);
                    }
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
    };
    /**
     * Method to dispatch necessary keyboard events to current input element.
     *
     * @see https://w3c.github.io/uievents/tools/key-event-viewer.html
     *
     * @param {KeyPressInterface} event
     */
    VirtualKeyboardComponent.prototype.dispatchEvents = function (event) {
        var eventInit = {
            bubbles: true,
            cancelable: true,
            shiftKey: this.shift,
            key: event.keyValue,
            code: "Key" + event.keyValue.toUpperCase() + "}",
            location: 0
        };
        // Simulate all needed events on base element
        if (this.inputElement !== undefined) {
            this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', eventInit));
            this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keypress', eventInit));
            this.inputElement.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
            this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keyup', eventInit));
        }
        // And set focus to input
        this.getKeyboardInput().nativeElement.focus();
    };
    VirtualKeyboardComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'virtual-keyboard',
                    template: "\n    <div class=\"container\">\n      <div fxLayout=\"column\">\n        <mat-form-field *ngIf=\"isDialog\">\n          <button class=\"close\" color=\"primary\" mat-button mat-mini-fab\n            (click)=\"close()\"\n          >\n            <mat-icon>check</mat-icon>\n          </button>\n    \n          <input type=\"{{type}}\"\n            matInput\n            #keyboardInput\n            (click)=\"updateCaretPosition()\"\n            [(ngModel)]=\"inputElement.nativeElement.value\" placeholder=\"{{ placeholder }}\"\n            [maxLength]=\"maxLength\"\n          />\n        </mat-form-field>\n    \n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\"\n          *ngFor=\"let row of layout; let rowIndex = index\"\n          [attr.data-index]=\"rowIndex\"\n        >\n          <virtual-keyboard-key\n            *ngFor=\"let key of row; let keyIndex = index\"\n            [key]=\"key\"\n            [disabled]=\"disabled\"\n            [attr.data-index]=\"keyIndex\"\n            (keyPress)=\"keyPress($event)\"\n          ></virtual-keyboard-key>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .close {\n      position: relative;\n      float: right;\n      top: -16px;\n      right: 0;\n      margin-bottom: -40px;\n    }\n  \n    .mat-input-container {\n      margin: -16px 0;\n      font-size: 32px;\n    }\n  \n    .mat-input-element:disabled {\n      color: currentColor;\n    }\n\n    :host /deep/ .mat-input-placeholder {\n      top: 10px !important;\n      font-size: 24px !important;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    VirtualKeyboardComponent.ctorParameters = function () { return [
        { type: dialog_1.MatDialogRef },
        { type: virtual_keyboard_service_1.VirtualKeyboardService }
    ]; };
    VirtualKeyboardComponent.propDecorators = {
        keyboardInput: [{ type: core_1.ViewChild, args: ['keyboardInput',] }],
        inputRef: [{ type: core_1.Input }],
        layout: [{ type: core_1.Input }]
    };
    return VirtualKeyboardComponent;
}());
exports.VirtualKeyboardComponent = VirtualKeyboardComponent;
//# sourceMappingURL=virtual-keyboard.component.js.map