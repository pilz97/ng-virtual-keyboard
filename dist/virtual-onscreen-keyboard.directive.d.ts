import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';
export declare class NgVirtualOnScreenKeyboardDirective {
    private element;
    private dialog;
    private opened;
    private focus;
    private inputRefSet;
    virtualKeyboardRef: VirtualKeyboardComponent;
    onFocus(): void;
    constructor(element: ElementRef, dialog: MatDialog);
}
