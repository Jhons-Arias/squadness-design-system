import { ButtonPage }          from './button'
import { IconButtonPage }      from './icon-button'
import { CheckboxPage }        from './checkbox'
import { RadioButtonPage }     from './radio-button'
import { SwitchPage }          from './switch'
import { InputPage }           from './input'
import { TextareaPage }        from './textarea'
import { SelectPage }          from './select'
import { DatePickerPage }      from './date-picker'
import { DateRangePickerPage } from './date-range-picker'
import { SideBarPage }         from './side-bar'

export interface RegistryEntry {
  title: string
  Component: React.ComponentType
}

export const registry: Record<string, RegistryEntry> = {
  button: {
    title: 'Button',
    Component: ButtonPage,
  },
  'icon-button': {
    title: 'Icon Button',
    Component: IconButtonPage,
  },
  checkbox: {
    title: 'Checkbox',
    Component: CheckboxPage,
  },
  'radio-button': {
    title: 'Radio Button',
    Component: RadioButtonPage,
  },
  switch: {
    title: 'Switch',
    Component: SwitchPage,
  },
  input: {
    title: 'Input',
    Component: InputPage,
  },
  textarea: {
    title: 'Textarea',
    Component: TextareaPage,
  },
  dropdown: {
    title: 'Select',
    Component: SelectPage,
  },
  'date-picker': {
    title: 'Date Picker',
    Component: DatePickerPage,
  },
  'date-range-picker': {
    title: 'Date Range Picker',
    Component: DateRangePickerPage,
  },
  'side-bar': {
    title: 'Side Bar',
    Component: SideBarPage,
  },
  // More components will be added here as they are documented:
  // 'badge': { title: 'Badge', Component: BadgePage },
  // ...
}
