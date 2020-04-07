"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var virtual_keyboard_component_1 = require("./virtual-keyboard.component");
var layouts_1 = require("./layouts");
var i0 = require("@angular/core");
var i1 = require("@angular/material/dialog");
var NgVirtualKeyboardDirective = /** @class */ (function () {
    /**
     * Constructor of the class.
     *
     * @param {ElementRef}  element
     * @param {MatDialog}    dialog
     */
    function NgVirtualKeyboardDirective(element, dialog) {
        this.element = element;
        this.dialog = dialog;
        this.opened = false;
        this.focus = true;
    }
    NgVirtualKeyboardDirective.prototype.onWindowBlur = function () {
        this.focus = false;
    };
    NgVirtualKeyboardDirective.prototype.onWindowFocus = function () {
        var _this = this;
        setTimeout(function () {
            _this.focus = true;
        }, 0);
    };
    NgVirtualKeyboardDirective.prototype.onFocus = function () {
        this.openKeyboard();
    };
    NgVirtualKeyboardDirective.prototype.onClick = function () {
        this.openKeyboard();
    };
    /**
     * Method to open virtual keyboard
     */
    NgVirtualKeyboardDirective.prototype.openKeyboard = function () {
        var _this = this;
        if (!this.opened && this.focus) {
            this.opened = true;
            var dialogRef = void 0;
            dialogRef = this.dialog.open(virtual_keyboard_component_1.VirtualKeyboardComponent);
            dialogRef.componentInstance.isDialog = true;
            dialogRef.componentInstance.inputElement = this.element;
            dialogRef.componentInstance.layout = this.getLayout();
            dialogRef.componentInstance.placeholder = this.getPlaceHolder();
            dialogRef.componentInstance.type = this.getType();
            dialogRef
                .afterClosed()
                .subscribe(function () {
                setTimeout(function () {
                    _this.opened = false;
                }, 0);
            });
        }
    };
    /**
     * Getter for used keyboard layout.
     *
     * @returns {KeyboardLayout}
     */
    NgVirtualKeyboardDirective.prototype.getLayout = function () {
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
            case 'price':
                layout = layouts_1.priceKeyboard;
                break;
            default:
                layout = this.layout;
                break;
        }
        return layout;
    };
    /**
     * Getter for used placeholder for virtual keyboard input field.
     *
     * @returns {string}
     */
    NgVirtualKeyboardDirective.prototype.getPlaceHolder = function () {
        return this.placeholder ? this.placeholder : this.element.nativeElement.placeholder;
    };
    /**
     * Getter for used type for virtual keyboard input field.
     *
     * @return {string}
     */
    NgVirtualKeyboardDirective.prototype.getType = function () {
        return this.type ? this.type : this.element.nativeElement.type;
    };
    NgVirtualKeyboardDirective.ɵfac = function NgVirtualKeyboardDirective_Factory(t) { return new (t || NgVirtualKeyboardDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.MatDialog)); };
    NgVirtualKeyboardDirective.ɵdir = i0.ɵɵdefineDirective({ type: NgVirtualKeyboardDirective, selectors: [["", "popup-keyboard", ""]], hostBindings: function NgVirtualKeyboardDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("blur", function NgVirtualKeyboardDirective_blur_HostBindingHandler() { return ctx.onWindowBlur(); }, false, i0.ɵɵresolveWindow)("focus", function NgVirtualKeyboardDirective_focus_HostBindingHandler() { return ctx.onWindowFocus(); }, false, i0.ɵɵresolveWindow)("focus", function NgVirtualKeyboardDirective_focus_HostBindingHandler() { return ctx.onFocus(); })("click", function NgVirtualKeyboardDirective_click_HostBindingHandler() { return ctx.onClick(); });
        } }, inputs: { layout: ["popup-keyboard-layout", "layout"], placeholder: ["popup-keyboard-placeholder", "placeholder"], type: ["popup-keyboard-type", "type"] } });
    return NgVirtualKeyboardDirective;
}());
exports.NgVirtualKeyboardDirective = NgVirtualKeyboardDirective;
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgVirtualKeyboardDirective, [{
        type: core_1.Directive,
        args: [{
                selector: '[popup-keyboard]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.MatDialog }]; }, { layout: [{
            type: core_1.Input,
            args: ['popup-keyboard-layout']
        }], placeholder: [{
            type: core_1.Input,
            args: ['popup-keyboard-placeholder']
        }], type: [{
            type: core_1.Input,
            args: ['popup-keyboard-type']
        }], onWindowBlur: [{
            type: core_1.HostListener,
            args: ['window:blur']
        }], onWindowFocus: [{
            type: core_1.HostListener,
            args: ['window:focus']
        }], onFocus: [{
            type: core_1.HostListener,
            args: ['focus']
        }], onClick: [{
            type: core_1.HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=virtual-keyboard.directive.js.map