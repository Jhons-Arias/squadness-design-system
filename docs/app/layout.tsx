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
import { PaginationStyles } from '@squadness/ui/pagination'
import { DateFilterDropdownStyles } from '@squadness/ui/date-filter-dropdown.styles'
import { SelectStyles } from '@squadness/ui/select.styles'

export const metadata: Metadata = {
  title: {
    default: 'Squadness Design System',
    template: '%s — Squadness',
  },
  description: 'Component documentation, design tokens, and usage guidelines for the Squadness Design System.',
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
  PaginationStyles,
  DateFilterDropdownStyles,
  SelectStyles,
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
