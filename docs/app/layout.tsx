import type { Metadata } from 'next'
import './globals.css'

// Inject all sq-* component CSS so previews render correctly
import { ButtonStyles } from '@squadness/ui/button'
import { BadgeStyles } from '@squadness/ui/badge'
import { CheckboxStyles } from '@squadness/ui/checkbox'
import { RadioButtonStyles } from '@squadness/ui/radio-button'
import { SwitchStyles } from '@squadness/ui/switch'
import { InputStyles } from '@squadness/ui/input'
import { TextareaStyles } from '@squadness/ui/textarea'
import { SidebarStyles } from '@squadness/ui/sidebar.styles'
import { TopBarStyles } from '@squadness/ui/topbar.styles'
import { PaginationStyles } from '@squadness/ui/pagination.styles'
import { DateFilterDropdownStyles } from '@squadness/ui/date-filter-dropdown.styles'
import { SelectStyles } from '@squadness/ui/select.styles'
import { TableStyles } from '@squadness/ui/table.styles'
import { CardStyles } from '@squadness/ui/card.styles'
import { DragDropStyles } from '@squadness/ui/drag-drop.styles'
import { ToastStyles }   from '@squadness/ui/toast.styles'
import { TooltipStyles } from '@squadness/ui/tooltip.styles'
import { DialogStyles }  from '@squadness/ui/dialog.styles'
import { PopoverStyles } from '@squadness/ui/popover.styles'
import { LayoutStyles }  from '@squadness/ui/layout.styles'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: {
    default: 'Squadness Design System',
    template: '%s — Squadness',
  },
  description: 'Component documentation, design tokens, and usage guidelines for the Squadness Design System.',
  icons: {
    icon: `${BASE}/Logo Squadness.png`,
    apple: `${BASE}/Logo Squadness.png`,
  },
}

const allStyles = [
  ButtonStyles,
  BadgeStyles,
  CheckboxStyles,
  RadioButtonStyles,
  SwitchStyles,
  InputStyles,
  TextareaStyles,
  SidebarStyles,
  TopBarStyles,
  PaginationStyles,
  DateFilterDropdownStyles,
  SelectStyles,
  TableStyles,
  CardStyles,
  DragDropStyles,
  ToastStyles,
  TooltipStyles,
  DialogStyles,
  PopoverStyles,
  LayoutStyles,
].join('\n')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: allStyles }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
