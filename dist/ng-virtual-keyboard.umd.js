(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/material"), require("@angular/material/dialog"), require("@angular/common"), require("@angular/flex-layout"), require("@angular/forms"), require("rxjs/internal/ReplaySubject"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/material", "@angular/material/dialog", "@angular/common", "@angular/flex-layout", "@angular/forms", "rxjs/internal/ReplaySubject"], factory);
	else if(typeof exports === 'object')
		exports["ng-virtual-keyboard"] = factory(require("@angular/core"), require("@angular/material"), require("@angular/material/dialog"), require("@angular/common"), require("@angular/flex-layout"), require("@angular/forms"), require("rxjs/internal/ReplaySubject"));
	else
		root["ng-virtual-keyboard"] = factory(root["@angular/core"], root["@angular/material"], root["@angular/material/dialog"], root["@angular/common"], root["@angular/flex-layout"], root["@angular/forms"], root["rxjs/internal/ReplaySubject"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var dialog_1 = __webpack_require__(7);
var virtual_keyboard_service_1 = __webpack_require__(6);
var layouts_1 = __webpack_require__(2);
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
    VirtualKeyboardComponent_1 = VirtualKeyboardComponent;
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
                VirtualKeyboardComponent_1.setSelectionRange(_this.getKeyboardInput().nativeElement, caretPosition, caretPosition);
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
    var VirtualKeyboardComponent_1;
    __decorate([
        core_1.ViewChild('keyboardInput'),
        __metadata("design:type", core_1.ElementRef)
    ], VirtualKeyboardComponent.prototype, "keyboardInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VirtualKeyboardComponent.prototype, "inputRef", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VirtualKeyboardComponent.prototype, "selectContent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VirtualKeyboardComponent.prototype, "layout", void 0);
    VirtualKeyboardComponent = VirtualKeyboardComponent_1 = __decorate([
        core_1.Component({
            selector: 'virtual-keyboard',
            template: "\n    <div class=\"container\">\n      <div fxLayout=\"column\">\n        <mat-form-field *ngIf=\"isDialog\">\n          <button class=\"close\"\n            (click)=\"close()\"\n          >\n            <mat-icon>check</mat-icon>\n          </button>\n    \n          <input type=\"{{type}}\"\n            matInput\n            #keyboardInput\n            (click)=\"updateCaretPosition()\"\n            [(ngModel)]=\"inputElement.nativeElement.value\" placeholder=\"{{ placeholder }}\"\n            [maxLength]=\"maxLength\" autofocus\n          />\n        </mat-form-field>\n    \n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\"\n          *ngFor=\"let row of layout; let rowIndex = index\"\n          [attr.data-index]=\"rowIndex\"\n        >\n          <virtual-keyboard-key\n            *ngFor=\"let key of row; let keyIndex = index\"\n            [key]=\"key\"\n            [disabled]=\"disabled\"\n            [attr.data-index]=\"keyIndex\"\n            (keyPress)=\"keyPress($event)\"\n          ></virtual-keyboard-key>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    .close {\n      position: relative;\n      float: right;\n      top: -16px;\n      right: 0;\n      margin-bottom: -40px;\n    }\n  \n    .mat-input-container {\n      margin: -16px 0;\n      font-size: 32px;\n    }\n  \n    .mat-input-element:disabled {\n      color: currentColor;\n    }\n\n    :host /deep/ .mat-input-placeholder {\n      top: 10px !important;\n      font-size: 24px !important;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [dialog_1.MatDialogRef,
            virtual_keyboard_service_1.VirtualKeyboardService])
    ], VirtualKeyboardComponent);
    return VirtualKeyboardComponent;
}());
exports.VirtualKeyboardComponent = VirtualKeyboardComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.alphanumericKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace:2'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'CapsLock:2'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Spacer', 'Shift:2'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Spacer:5'],
];
exports.alphanumericNordicKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Spacer', 'Backspace:2'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', 'CapsLock:2'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', 'Shift:2'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Spacer:6'],
];
exports.extendedKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace:2'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'CapsLock:2'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Spacer', 'Shift:2'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', '_', '+'],
    ['Spacer', '@', 'SpaceBar:7', '#', 'Spacer:2'],
];
exports.extendedNordicKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', 'Backspace:2'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', 'Enter:2'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', 'Shift:2'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', '_', 'Spacer:2'],
    ['Spacer', '@', 'SpaceBar:7', '#', 'Spacer:3'],
];
exports.numericKeyboard = [
    ['1', '2', '3', 'Backspace:2'],
    ['4', '5', '6', 'Spacer:2'],
    ['7', '8', '9', 'Spacer:2'],
    ['', '0', '', 'Spacer:2'],
];
exports.phoneKeyboard = [
    ['1', '2', '3', 'Backspace:2'],
    ['4', '5', '6', 'Spacer:2'],
    ['7', '8', '9', 'Spacer:2'],
    ['-', '0', '+', 'Spacer:2'],
];
exports.priceKeyboard = [
    [
        '1',
        '2',
        '3',
    ],
    [
        '4',
        '5',
        '6',
    ],
    [
        '7',
        '8',
        '9',
    ],
    [
        '.',
        '0',
        'Backspace',
    ],
];
exports.specialKeys = [
    'Enter',
    'Backspace',
    'Escape',
    'CapsLock',
    'SpaceBar',
    'Spacer',
    'Shift',
];
exports.specialKeyIcons = {
    Enter: 'keyboard_return',
    Backspace: 'backspace',
    Escape: 'close',
    SpaceBar: 'space_bar',
    Shift: 'keyboard_capslock'
};
exports.specialKeyTexts = {
    CapsLock: 'Caps'
};
exports.notDisabledSpecialKeys = [
    'Enter',
    'Backspace',
    'Escape',
];
/**
 * Helper function to determine if given key is 'Spacer' or not.
 *
 * @param {string}  key
 * @returns {boolean}
 */
function isSpacer(key) {
    if (key.length > 1) {
        return /^Spacer(:(\d+(\.\d+)?))?$/g.test(key);
    }
    return false;
}
exports.isSpacer = isSpacer;
/**
 * Helper function to determine if given key is special or not.
 *
 * @param {string}  key
 * @returns {boolean}
 */
function isSpecial(key) {
    if (key.length > 1) {
        return !!exports.specialKeys.filter(function (specialKey) {
            var pattern = new RegExp("^(" + specialKey + ")(:(\\d+(\\.\\d+)?))?$", 'g');
            return pattern.test(key);
        }).length;
    }
    return false;
}
exports.isSpecial = isSpecial;
/**
 * Function to change specified layout to CapsLock layout.
 *
 * @param {KeyboardLayout}  layout
 * @param {boolean}         caps
 * @returns {KeyboardLayout}
 */
function keyboardCapsLockLayout(layout, caps) {
    return layout.map(function (row) {
        return row.map(function (key) {
            return isSpecial(key) ? key : (caps ? key.toUpperCase() : key.toLowerCase());
        });
    });
}
exports.keyboardCapsLockLayout = keyboardCapsLockLayout;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var material_1 = __webpack_require__(3);
var virtual_keyboard_component_1 = __webpack_require__(1);
var layouts_1 = __webpack_require__(2);
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
    __decorate([
        core_1.Input('ng-virtual-keyboard-layout'),
        __metadata("design:type", Object)
    ], NgVirtualKeyboardDirective.prototype, "layout", void 0);
    __decorate([
        core_1.Input('ng-virtual-keyboard-placeholder'),
        __metadata("design:type", String)
    ], NgVirtualKeyboardDirective.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input('ng-virtual-keyboard-type'),
        __metadata("design:type", String)
    ], NgVirtualKeyboardDirective.prototype, "type", void 0);
    __decorate([
        core_1.HostListener('window:blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgVirtualKeyboardDirective.prototype, "onWindowBlur", null);
    __decorate([
        core_1.HostListener('window:focus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgVirtualKeyboardDirective.prototype, "onWindowFocus", null);
    __decorate([
        core_1.HostListener('focus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgVirtualKeyboardDirective.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgVirtualKeyboardDirective.prototype, "onClick", null);
    NgVirtualKeyboardDirective = __decorate([
        core_1.Directive({
            selector: '[ng-virtual-keyboard]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            material_1.MatDialog])
    ], NgVirtualKeyboardDirective);
    return NgVirtualKeyboardDirective;
}());
exports.NgVirtualKeyboardDirective = NgVirtualKeyboardDirective;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var material_1 = __webpack_require__(3);
var virtual_keyboard_component_1 = __webpack_require__(1);
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
    __decorate([
        core_1.Input('ng-virtual-onscreen-keyboard'),
        __metadata("design:type", virtual_keyboard_component_1.VirtualKeyboardComponent)
    ], NgVirtualOnScreenKeyboardDirective.prototype, "virtualKeyboardRef", void 0);
    __decorate([
        core_1.HostListener('focus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgVirtualOnScreenKeyboardDirective.prototype, "onFocus", null);
    NgVirtualOnScreenKeyboardDirective = __decorate([
        core_1.Directive({
            selector: '[ng-virtual-onscreen-keyboard]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            material_1.MatDialog])
    ], NgVirtualOnScreenKeyboardDirective);
    return NgVirtualOnScreenKeyboardDirective;
}());
exports.NgVirtualOnScreenKeyboardDirective = NgVirtualOnScreenKeyboardDirective;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ReplaySubject_1 = __webpack_require__(14);
var VirtualKeyboardService = /** @class */ (function () {
    function VirtualKeyboardService() {
        this.shift$ = new ReplaySubject_1.ReplaySubject(1);
        this.capsLock$ = new ReplaySubject_1.ReplaySubject(1);
        this.caretPosition$ = new ReplaySubject_1.ReplaySubject(1);
        this.capsLock = false;
        this.shift = false;
    }
    /**
     * Setter for Shift value, note that this also sets CapsLock value.
     *
     * @param {boolean} value
     */
    VirtualKeyboardService.prototype.setShift = function (value) {
        this.shift = value;
        this.shift$.next(this.shift);
        this.setCapsLock(this.shift);
    };
    /**
     * Setter for CapsLock value
     *
     * @param {boolean} value
     */
    VirtualKeyboardService.prototype.setCapsLock = function (value) {
        this.capsLock = value;
        this.capsLock$.next(value);
    };
    /**
     * Toggle for Shift, note that this also toggles CapsLock
     */
    VirtualKeyboardService.prototype.toggleShift = function () {
        this.shift = !this.shift;
        this.shift$.next(this.shift);
        this.setCapsLock(this.shift);
    };
    /**
     * Toggle for CapsLock
     */
    VirtualKeyboardService.prototype.toggleCapsLock = function () {
        this.capsLock = !this.capsLock;
        this.capsLock$.next(this.capsLock);
    };
    /**
     * Setter for caret position value.
     *
     * @param {number}  position
     */
    VirtualKeyboardService.prototype.setCaretPosition = function (position) {
        this.caretPosition$.next(position);
    };
    /**
     * Method to reset Shift and CapsLock values to default ones.
     */
    VirtualKeyboardService.prototype.reset = function () {
        this.setShift(false);
    };
    VirtualKeyboardService = __decorate([
        core_1.Injectable()
    ], VirtualKeyboardService);
    return VirtualKeyboardService;
}());
exports.VirtualKeyboardService = VirtualKeyboardService;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(11);
var forms_1 = __webpack_require__(13);
var material_1 = __webpack_require__(3);
var dialog_1 = __webpack_require__(7);
var flex_layout_1 = __webpack_require__(12);
var virtual_keyboard_directive_1 = __webpack_require__(4);
var virtual_keyboard_component_1 = __webpack_require__(1);
var virtual_keyboard_key_component_1 = __webpack_require__(10);
var virtual_keyboard_service_1 = __webpack_require__(6);
var virtual_onscreen_keyboard_directive_1 = __webpack_require__(5);
var NgVirtualKeyboardModule = /** @class */ (function () {
    function NgVirtualKeyboardModule() {
    }
    NgVirtualKeyboardModule = __decorate([
        core_1.NgModule({
            declarations: [
                virtual_keyboard_directive_1.NgVirtualKeyboardDirective,
                virtual_keyboard_component_1.VirtualKeyboardComponent,
                virtual_keyboard_key_component_1.VirtualKeyboardKeyComponent,
                virtual_onscreen_keyboard_directive_1.NgVirtualOnScreenKeyboardDirective,
            ],
            providers: [
                virtual_keyboard_service_1.VirtualKeyboardService,
                {
                    provide: dialog_1.MatDialogRef,
                    useValue: {}
                }
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                material_1.MatButtonModule,
                dialog_1.MatDialogModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
            ],
            entryComponents: [
                virtual_keyboard_component_1.VirtualKeyboardComponent,
            ],
            exports: [
                virtual_keyboard_directive_1.NgVirtualKeyboardDirective,
                virtual_onscreen_keyboard_directive_1.NgVirtualOnScreenKeyboardDirective,
                virtual_keyboard_component_1.VirtualKeyboardComponent,
            ]
        })
    ], NgVirtualKeyboardModule);
    return NgVirtualKeyboardModule;
}());
exports.NgVirtualKeyboardModule = NgVirtualKeyboardModule;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var virtual_keyboard_directive_1 = __webpack_require__(4);
exports.NgVirtualKeyboardDirective = virtual_keyboard_directive_1.NgVirtualKeyboardDirective;
var virtual_onscreen_keyboard_directive_1 = __webpack_require__(5);
exports.NgVirtualOnScreenKeyboardDirective = virtual_onscreen_keyboard_directive_1.NgVirtualOnScreenKeyboardDirective;
var virtual_keyboard_module_1 = __webpack_require__(8);
exports.NgVirtualKeyboardModule = virtual_keyboard_module_1.NgVirtualKeyboardModule;
var virtual_keyboard_component_1 = __webpack_require__(1);
exports.VirtualKeyboardComponent = virtual_keyboard_component_1.VirtualKeyboardComponent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var layouts_1 = __webpack_require__(2);
var VirtualKeyboardKeyComponent = /** @class */ (function () {
    /**
     * Constructor of the class.
     */
    function VirtualKeyboardKeyComponent() {
        this.keyPress = new core_1.EventEmitter();
        this.special = false;
        this.spacer = false;
    }
    /**
     * On init life cycle hook, within this we'll initialize following properties:
     *  - special
     *  - keyValue
     *  - flexValue
     */
    VirtualKeyboardKeyComponent.prototype.ngOnInit = function () {
        var multiplier = 1;
        var fix = 0;
        if (this.key.length > 1) {
            this.spacer = layouts_1.isSpacer(this.key);
            this.special = layouts_1.isSpecial(this.key);
            var matches = /^(\w+)(:(\d+(\.\d+)?))?$/g.exec(this.key);
            this.keyValue = matches[1];
            if (matches[3]) {
                multiplier = parseFloat(matches[3]);
                fix = (multiplier - 1) * 4;
            }
        }
        else {
            this.keyValue = this.key;
        }
        if (this.special) {
            if (layouts_1.specialKeyIcons.hasOwnProperty(this.keyValue)) {
                this.icon = layouts_1.specialKeyIcons[this.keyValue];
            }
            else if (layouts_1.specialKeyTexts.hasOwnProperty(this.keyValue)) {
                this.text = layouts_1.specialKeyTexts[this.keyValue];
            }
        }
        this.flexValue = multiplier * 64 + fix + "px";
    };
    /**
     * Method to check if key is disabled or not.
     *
     * @returns {boolean}
     */
    VirtualKeyboardKeyComponent.prototype.isDisabled = function () {
        if (this.spacer) {
            return true;
        }
        else if (this.disabled && layouts_1.notDisabledSpecialKeys.indexOf(this.keyValue) !== -1) {
            return false;
        }
        else {
            return this.disabled;
        }
    };
    /**
     * Method to handle actual "key" press from virtual keyboard.
     *  1) Key is "Special", process special key event
     *  2) Key is "Normal", append this key value to input
     */
    VirtualKeyboardKeyComponent.prototype.onKeyPress = function () {
        this.keyPress.emit({ special: this.special, keyValue: this.keyValue, key: this.key });
    };
    VirtualKeyboardKeyComponent.prototype.getClass = function () {
        if (this.spacer || this.keyValue === '') {
            return 'empty-key';
        }
        return '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VirtualKeyboardKeyComponent.prototype, "key", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VirtualKeyboardKeyComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], VirtualKeyboardKeyComponent.prototype, "keyPress", void 0);
    VirtualKeyboardKeyComponent = __decorate([
        core_1.Component({
            selector: 'virtual-keyboard-key',
            template: "\n    <button\n      fxFlex=\"{{ flexValue }}\"\n      [class.spacer]=\"spacer\"\n      [disabled]=\"isDisabled()\"\n      [class]=\"getClass()\"\n      (click)=\"onKeyPress()\"\n    >\n      <span *ngIf=\"!special\">{{ keyValue }}</span>\n    \n      <span *ngIf=\"special\">\n        <mat-icon *ngIf=\"icon\">{{ icon }}</mat-icon>\n    \n        {{ text }}\n      </span>\n    </button>\n  ",
            styles: ["\n    .mat-button,\n    .mat-icon-button,\n    .mat-raised-button {\n      min-width: 64px;\n      min-height: 64px;\n      padding: 0;\n      margin: 2px;\n      font-size: 32px;\n      line-height: 32px;\n    }\n    \n    .mat-button.spacer,\n    .mat-icon-button.spacer,\n    .mat-raised-button.spacer {\n      background-color: transparent;\n    }\n\n    .empty-key {\n      border: none;\n      background: none;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], VirtualKeyboardKeyComponent);
    return VirtualKeyboardKeyComponent;
}());
exports.VirtualKeyboardKeyComponent = VirtualKeyboardKeyComponent;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ng-virtual-keyboard.umd.js.map