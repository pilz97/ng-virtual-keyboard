import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgVirtualKeyboardDirective } from './virtual-keyboard.directive';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import { VirtualKeyboardKeyComponent } from './virtual-keyboard-key.component';
import { VirtualKeyboardService } from './virtual-keyboard.service';

@NgModule({
  declarations: [
    NgVirtualKeyboardDirective,
    VirtualKeyboardComponent,
    VirtualKeyboardKeyComponent,
  ],
  providers: [
    VirtualKeyboardService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
  ],
  entryComponents: [
    VirtualKeyboardComponent,
  ],
  exports: [
    NgVirtualKeyboardDirective,
    VirtualKeyboardComponent,
  ]
})

export class NgVirtualKeyboardModule {
}
