"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var virtual_keyboard_service_1 = require("./virtual-keyboard.service");
var layouts_1 = require("./layouts");
var i0 = require("@angular/core");
var i1 = require("@angular/material/dialog");
var i2 = require("./virtual-keyboard.service");
var i3 = require("@angular/flex-layout/flex");
var i4 = require("@angular/common");
var i5 = require("@angular/material/form-field");
var i6 = require("@angular/material/icon");
var i7 = require("@angular/material/input");
var i8 = require("@angular/forms");
var i9 = require("./virtual-keyboard-key.component");
var _c0 = ["keyboardInput"];
function VirtualKeyboardComponent_mat_form_field_2_Template(rf, ctx) { if (rf & 1) {
    var _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-form-field");
    i0.ɵɵelementStart(1, "button", 4);
    i0.ɵɵlistener("click", function VirtualKeyboardComponent_mat_form_field_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.close(); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "check");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 5, 6);
    i0.ɵɵlistener("click", function VirtualKeyboardComponent_mat_form_field_2_Template_input_click_4_listener() { i0.ɵɵrestoreView(_r4); var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.updateCaretPosition(); })("ngModelChange", function VirtualKeyboardComponent_mat_form_field_2_Template_input_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r4); var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.inputElement.nativeElement.value = $event; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵpropertyInterpolate("type", ctx_r0.type);
    i0.ɵɵpropertyInterpolate("placeholder", ctx_r0.placeholder);
    i0.ɵɵproperty("ngModel", ctx_r0.inputElement.nativeElement.value)("maxLength", ctx_r0.maxLength);
} }
function VirtualKeyboardComponent_div_3_virtual_keyboard_key_1_Template(rf, ctx) { if (rf & 1) {
    var _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "virtual-keyboard-key", 9);
    i0.ɵɵlistener("keyPress", function VirtualKeyboardComponent_div_3_virtual_keyboard_key_1_Template_virtual_keyboard_key_keyPress_0_listener($event) { i0.ɵɵrestoreView(_r13); var ctx_r12 = i0.ɵɵnextContext(2); return ctx_r12.keyPress($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var key_r10 = ctx.$implicit;
    var keyIndex_r11 = ctx.index;
    var ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("key", key_r10)("disabled", ctx_r9.disabled);
    i0.ɵɵattribute("data-index", keyIndex_r11);
} }
function VirtualKeyboardComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, VirtualKeyboardComponent_div_3_virtual_keyboard_key_1_Template, 1, 3, "virtual-keyboard-key", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var row_r7 = ctx.$implicit;
    var rowIndex_r8 = ctx.index;
    i0.ɵɵattribute("data-index", rowIndex_r8);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r7);
} }
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
        this.selectContent = false;
        this.isDialog = false;
        this.shift = false;
        this.keyWasPressed = false;
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
        if (typeof this.layout === 'string' || this.layout instanceof String) {
            this.layout = this.getLayout();
        }
        if (!this.inputRef && !this.isDialog) {
            return;
        }
        else if (!this.isDialog) {
            this.keyboardInputRef = new core_1.ElementRef(this.inputRef);
            this.inputElement = new core_1.ElementRef(this.inputRef);
            this.inputElement.nativeElement.addEventListener('click', this.updateCaretPosition.bind(this));
        }
        this.doInit();
    };
    VirtualKeyboardComponent.prototype.doInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.getKeyboardInput().nativeElement.focus();
        }, 500);
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
        if (this.selectContent) {
            this.inputElement.nativeElement.select();
        }
        else if (this.inputElement !== undefined) {
            if (this.inputElement.nativeElement.value.length) {
                this.virtualKeyboardService.setCaretPosition(this.inputElement.nativeElement.value.length);
            }
            this.maxLength = this.inputElement.nativeElement.maxLength > 0 ? this.inputElement.nativeElement.maxLength : '';
        }
        this.checkDisabled();
    };
    VirtualKeyboardComponent.prototype.getKeyWasPressed = function () {
        return this.keyWasPressed;
    };
    VirtualKeyboardComponent.prototype.setKeyWasPressed = function (value) {
        this.keyWasPressed = value;
    };
    VirtualKeyboardComponent.prototype.setInputRef = function (ref) {
        if (!!this.inputElement) {
            this.inputElement.nativeElement.removeEventListener('click', this.updateCaretPosition.bind(this));
        }
        this.keyboardInputRef = new core_1.ElementRef(ref);
        this.inputElement = new core_1.ElementRef(ref);
        this.inputElement.nativeElement.addEventListener('click', this.updateCaretPosition.bind(this));
        this.doInit();
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
        this.keyWasPressed = true;
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
    VirtualKeyboardComponent.ɵfac = function VirtualKeyboardComponent_Factory(t) { return new (t || VirtualKeyboardComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef), i0.ɵɵdirectiveInject(i2.VirtualKeyboardService)); };
    VirtualKeyboardComponent.ɵcmp = i0.ɵɵdefineComponent({ type: VirtualKeyboardComponent, selectors: [["virtual-keyboard"]], viewQuery: function VirtualKeyboardComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.keyboardInput = _t.first);
        } }, inputs: { inputRef: "inputRef", selectContent: "selectContent", layout: "layout" }, decls: 4, vars: 2, consts: [[1, "container"], ["fxLayout", "column"], [4, "ngIf"], ["fxLayout", "row", "fxLayoutAlign", "center center", 4, "ngFor", "ngForOf"], [1, "close", 3, "click"], ["matInput", "", "autofocus", "", 3, "type", "ngModel", "placeholder", "maxLength", "click", "ngModelChange"], ["keyboardInput", ""], ["fxLayout", "row", "fxLayoutAlign", "center center"], [3, "key", "disabled", "keyPress", 4, "ngFor", "ngForOf"], [3, "key", "disabled", "keyPress"]], template: function VirtualKeyboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵtemplate(2, VirtualKeyboardComponent_mat_form_field_2_Template, 6, 4, "mat-form-field", 2);
            i0.ɵɵtemplate(3, VirtualKeyboardComponent_div_3_Template, 2, 2, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isDialog);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.layout);
        } }, directives: [i3.DefaultLayoutDirective, i4.NgIf, i4.NgForOf, i5.MatFormField, i6.MatIcon, i7.MatInput, i8.DefaultValueAccessor, i8.NgControlStatus, i8.NgModel, i3.DefaultLayoutAlignDirective, i9.VirtualKeyboardKeyComponent], styles: [".close[_ngcontent-%COMP%] {\n      position: relative;\n      float: right;\n      top: -16px;\n      right: 0;\n      margin-bottom: -40px;\n    }\n  \n    .mat-input-container[_ngcontent-%COMP%] {\n      margin: -16px 0;\n      font-size: 32px;\n    }\n  \n    .mat-input-element[_ngcontent-%COMP%]:disabled {\n      color: currentColor;\n    }\n\n    [_nghost-%COMP%]     .mat-input-placeholder {\n      top: 10px !important;\n      font-size: 24px !important;\n    }"] });
    return VirtualKeyboardComponent;
}());
exports.VirtualKeyboardComponent = VirtualKeyboardComponent;
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(VirtualKeyboardComponent, [{
        type: core_1.Component,
        args: [{
                selector: 'virtual-keyboard',
                template: "\n    <div class=\"container\">\n      <div fxLayout=\"column\">\n        <mat-form-field *ngIf=\"isDialog\">\n          <button class=\"close\"\n            (click)=\"close()\"\n          >\n            <mat-icon>check</mat-icon>\n          </button>\n    \n          <input type=\"{{type}}\"\n            matInput\n            #keyboardInput\n            (click)=\"updateCaretPosition()\"\n            [(ngModel)]=\"inputElement.nativeElement.value\" placeholder=\"{{ placeholder }}\"\n            [maxLength]=\"maxLength\" autofocus\n          />\n        </mat-form-field>\n    \n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\"\n          *ngFor=\"let row of layout; let rowIndex = index\"\n          [attr.data-index]=\"rowIndex\"\n        >\n          <virtual-keyboard-key\n            *ngFor=\"let key of row; let keyIndex = index\"\n            [key]=\"key\"\n            [disabled]=\"disabled\"\n            [attr.data-index]=\"keyIndex\"\n            (keyPress)=\"keyPress($event)\"\n          ></virtual-keyboard-key>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    .close {\n      position: relative;\n      float: right;\n      top: -16px;\n      right: 0;\n      margin-bottom: -40px;\n    }\n  \n    .mat-input-container {\n      margin: -16px 0;\n      font-size: 32px;\n    }\n  \n    .mat-input-element:disabled {\n      color: currentColor;\n    }\n\n    :host /deep/ .mat-input-placeholder {\n      top: 10px !important;\n      font-size: 24px !important;\n    }\n  "]
            }]
    }], function () { return [{ type: i1.MatDialogRef }, { type: i2.VirtualKeyboardService }]; }, { keyboardInput: [{
            type: core_1.ViewChild,
            args: ['keyboardInput']
        }], inputRef: [{
            type: core_1.Input
        }], selectContent: [{
            type: core_1.Input
        }], layout: [{
            type: core_1.Input
        }] }); })();
//# sourceMappingURL=virtual-keyboard.component.js.map