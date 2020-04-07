"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var virtual_keyboard_component_1 = require("./virtual-keyboard.component");
var i0 = require("@angular/core");
var i1 = require("@angular/material/dialog");
var NgVirtualOnScreenKeyboardDirective = /** @class */ (function () {
    function NgVirtualOnScreenKeyboardDirective(element, dialog) {
        this.element = element;
        this.dialog = dialog;
        this.opened = false;
        this.focus = true;
        this.inputRefSet = false;
    }
    NgVirtualOnScreenKeyboardDirective.prototype.onFocus = function () {
        if (this.virtualKeyboardRef.getKeyWasPressed()) {
            this.virtualKeyboardRef.setKeyWasPressed(false);
            return;
        }
        this.inputRefSet = true;
        this.virtualKeyboardRef.setInputRef(this.element.nativeElement);
    };
    NgVirtualOnScreenKeyboardDirective.ɵfac = function NgVirtualOnScreenKeyboardDirective_Factory(t) { return new (t || NgVirtualOnScreenKeyboardDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.MatDialog)); };
    NgVirtualOnScreenKeyboardDirective.ɵdir = i0.ɵɵdefineDirective({ type: NgVirtualOnScreenKeyboardDirective, selectors: [["", "ng-virtual-onscreen-keyboard", ""]], hostBindings: function NgVirtualOnScreenKeyboardDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("focus", function NgVirtualOnScreenKeyboardDirective_focus_HostBindingHandler() { return ctx.onFocus(); });
        } }, inputs: { virtualKeyboardRef: ["ng-virtual-onscreen-keyboard", "virtualKeyboardRef"] } });
    return NgVirtualOnScreenKeyboardDirective;
}());
exports.NgVirtualOnScreenKeyboardDirective = NgVirtualOnScreenKeyboardDirective;
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgVirtualOnScreenKeyboardDirective, [{
        type: core_1.Directive,
        args: [{
                selector: '[ng-virtual-onscreen-keyboard]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.MatDialog }]; }, { virtualKeyboardRef: [{
            type: core_1.Input,
            args: ['ng-virtual-onscreen-keyboard']
        }], onFocus: [{
            type: core_1.HostListener,
            args: ['focus']
        }] }); })();
//# sourceMappingURL=virtual-onscreen-keyboard.directive.js.map