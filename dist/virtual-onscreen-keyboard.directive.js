"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var virtual_keyboard_component_1 = require("./virtual-keyboard.component");
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
    NgVirtualOnScreenKeyboardDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ng-virtual-onscreen-keyboard]'
                },] },
    ];
    /** @nocollapse */
    NgVirtualOnScreenKeyboardDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: material_1.MatDialog }
    ]; };
    NgVirtualOnScreenKeyboardDirective.propDecorators = {
        virtualKeyboardRef: [{ type: core_1.Input, args: ['ng-virtual-onscreen-keyboard',] }],
        onFocus: [{ type: core_1.HostListener, args: ['focus',] }]
    };
    return NgVirtualOnScreenKeyboardDirective;
}());
exports.NgVirtualOnScreenKeyboardDirective = NgVirtualOnScreenKeyboardDirective;
//# sourceMappingURL=virtual-onscreen-keyboard.directive.js.map