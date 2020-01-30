"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var dialog_1 = require("@angular/material/dialog");
var flex_layout_1 = require("@angular/flex-layout");
var virtual_keyboard_directive_1 = require("./virtual-keyboard.directive");
var virtual_keyboard_component_1 = require("./virtual-keyboard.component");
var virtual_keyboard_key_component_1 = require("./virtual-keyboard-key.component");
var virtual_keyboard_service_1 = require("./virtual-keyboard.service");
var virtual_onscreen_keyboard_directive_1 = require("./virtual-onscreen-keyboard.directive");
var ɵ0 = {};
exports.ɵ0 = ɵ0;
var NgVirtualKeyboardModule = /** @class */ (function () {
    function NgVirtualKeyboardModule() {
    }
    NgVirtualKeyboardModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                            useValue: ɵ0
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
                },] },
    ];
    return NgVirtualKeyboardModule;
}());
exports.NgVirtualKeyboardModule = NgVirtualKeyboardModule;
//# sourceMappingURL=virtual-keyboard.module.js.map