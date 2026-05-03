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
import { LayoutPage }          from './layout'
import { SideBarPage }         from './side-bar'
import { TopBarPage }          from './top-bar'
import { PaginationPage }      from './pagination'
import { TablePage }           from './table'
import { CardPage }            from './card'
import { DragDropPage }        from './drag-drop'
import { BadgePage }           from './badge'
import { ToastPage }           from './toast'
import { TooltipPage }         from './tooltip'
import { DialogPage }          from './dialog'
import { PopoverPage }         from './popover'
import { IconsPage }           from './icons'

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
  layout: {
    title: 'Layout',
    Component: LayoutPage,
  },
  'side-bar': {
    title: 'Side Bar',
    Component: SideBarPage,
  },
  'top-bar': {
    title: 'Top Bar',
    Component: TopBarPage,
  },
  pagination: {
    title: 'Pagination',
    Component: PaginationPage,
  },
  table: {
    title: 'Table',
    Component: TablePage,
  },
  card: {
    title: 'Card',
    Component: CardPage,
  },
  'drag-drop': {
    title: 'Drag & Drop',
    Component: DragDropPage,
  },
  badge: {
    title: 'Badge',
    Component: BadgePage,
  },
  toast: {
    title: 'Toast',
    Component: ToastPage,
  },
  tooltip: {
    title: 'Tooltip',
    Component: TooltipPage,
  },
  dialog: {
    title: 'Dialog',
    Component: DialogPage,
  },
  popover: {
    title: 'Popover',
    Component: PopoverPage,
  },
  icons: {
    title: 'Icons',
    Component: IconsPage,
  },
  // More components will be added here as they are documented:
}
