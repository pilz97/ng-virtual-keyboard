import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import * as i0 from "@angular/core";
export declare class NgVirtualOnScreenKeyboardDirective {
    private element;
    private dialog;
    private opened;
    private focus;
    private inputRefSet;
    virtualKeyboardRef: VirtualKeyboardComponent;
    onFocus(): void;
    constructor(element: ElementRef, dialog: MatDialog);
    static ɵfac: i0.ɵɵFactoryDef<NgVirtualOnScreenKeyboardDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NgVirtualOnScreenKeyboardDirective, "[ng-virtual-onscreen-keyboard]", never, { "virtualKeyboardRef": "ng-virtual-onscreen-keyboard"; }, {}, never>;
}
