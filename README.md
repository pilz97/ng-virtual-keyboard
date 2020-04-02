# popup-keyboard
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://badge.fury.io/js/%40protacon%2Fpopup-keyboard.svg)](https://badge.fury.io/js/%40protacon%2Fpopup-keyboard)
[![npm](https://img.shields.io/npm/dm/@protacon/popup-keyboard.svg)](https://www.npmjs.com/package/@protacon/popup-keyboard)
[![Dependency Status](https://david-dm.org/protacon/popup-keyboard.svg)](https://david-dm.org/protacon/popup-keyboard)
[![devDependency Status](https://david-dm.org/protacon/popup-keyboard/dev-status.svg)](https://david-dm.org/protacon/popup-keyboard#info=devDependencies)

## What is this?
Virtual Keyboard for Angular applications

## Install
### Step 1: Install @protacon/popup-keyboard
```bash
$ npm install --save @protacon/popup-keyboard
```

### Step 2: Import the module
Add `NgVirtualKeyboardModule` as an import in your app's root NgModule.
```typescript
import { NgVirtualKeyboardModule }  from '@protacon/popup-keyboard';

@NgModule({
  ...
  imports: [
    ...
    NgVirtualKeyboardModule,
  ],
  ...
})
export class AppModule { }
```

## Usage
Simple usage example
```html
<input type="text" value=""
  popup-keyboard
  popup-keyboard-layout="alphanumeric"
  popup-keyboard-placeholder="Custom placeholder text"
/>
```
Instead of opening the dialog you can use it as an onscreen keyboard
```html
  <input type="number" [(ngModel)]="text" #inputField/>
  <virtual-keyboard layout="numeric" [inputRef]="inputField"></virtual-keyboard>
```
| Attribute | Description |
| --- | --- |
| `popup-keyboard`             | Required to initialize Virtual Keyboard to specified input |
| `popup-keyboard-layout`      | Used layout on keyboard, following keyboards are defaults that you can use `alphanumeric, alphanumericNordic, extended, extendedNordic, numeric, phone` |
| `popup-keyboard-placeholder` | Override placeholder text, if input has not any - or you want to override input placeholder value |

## Demo
https://protacon.github.io/popup-keyboard/

## License
[The MIT License (MIT)](LICENSE)

Copyright (c) 2017 Protacon
