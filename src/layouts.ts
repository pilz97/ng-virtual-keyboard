export type KeyboardLayout = Array<Array<string>>;

export const alphanumericKeyboard: KeyboardLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace:2'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'CapsLock:2'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Spacer', 'Shift:2'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Spacer:5'],
];

export const alphanumericNordicKeyboard: KeyboardLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Spacer', 'Backspace:2'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', 'CapsLock:2'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', 'Shift:2'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Spacer:6'],
];

export const extendedKeyboard: KeyboardLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace:2'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'CapsLock:2'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Spacer', 'Shift:2'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', '_', '+'],
  ['Spacer', '@', 'SpaceBar:7', '#', 'Spacer:2'],
];

export const extendedNordicKeyboard: KeyboardLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', 'Backspace:2'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', 'Enter:2'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', 'Shift:2'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', '_', 'Spacer:2'],
  ['Spacer', '@', 'SpaceBar:7', '#', 'Spacer:3'],
];

export const numericKeyboard: KeyboardLayout = [
  ['1', '2', '3', 'Backspace:2'],
  ['4', '5', '6', 'Spacer:2'],
  ['7', '8', '9', 'Spacer:2'],
  ['', '0', '', 'Spacer:2'],
];

export const phoneKeyboard: KeyboardLayout = [
  ['1', '2', '3', 'Backspace:2'],
  ['4', '5', '6', 'Spacer:2'],
  ['7', '8', '9', 'Spacer:2'],
  ['-', '0', '+', 'Spacer:2'],
];

export const priceKeyboard: KeyboardLayout = [
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

export const specialKeys: Array<string> = [
  'Enter',
  'Backspace',
  'Escape',
  'CapsLock',
  'SpaceBar',
  'Spacer',
  'Shift',
];

export const specialKeyIcons = {
  Enter: 'keyboard_return',
  Backspace: 'backspace',
  Escape: 'close',
  SpaceBar: 'space_bar',
  Shift: 'keyboard_capslock'
};

export const specialKeyTexts = {
  CapsLock: 'Caps'
};

export const notDisabledSpecialKeys = [
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
export function isSpacer(key: string): boolean {
  if (key.length > 1) {
    return /^Spacer(:(\d+(\.\d+)?))?$/g.test(key);
  }

  return false;
}

/**
 * Helper function to determine if given key is special or not.
 *
 * @param {string}  key
 * @returns {boolean}
 */
export function isSpecial(key: string): boolean {
  if (key.length > 1) {
    return !!specialKeys.filter(specialKey => {
      const pattern = new RegExp(`^(${specialKey})(:(\\d+(\\.\\d+)?))?$`, 'g');

      return pattern.test(key);
    }).length;
  }

  return false;
}

/**
 * Function to change specified layout to CapsLock layout.
 *
 * @param {KeyboardLayout}  layout
 * @param {boolean}         caps
 * @returns {KeyboardLayout}
 */
export function keyboardCapsLockLayout(layout: KeyboardLayout, caps: boolean): KeyboardLayout {
  return layout.map((row: Array<string>): Array<string> => {
    return row.map((key: string): string => {
      return isSpecial(key) ? key : (caps ? key.toUpperCase() : key.toLowerCase());
    });
  });
}
