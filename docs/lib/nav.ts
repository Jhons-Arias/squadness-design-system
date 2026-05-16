export interface NavItem {
  label: string
  slug: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface NavSection {
  label: string
  items?: NavItem[]
  groups?: NavGroup[]
}

export const navigation: NavSection[] = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction',  slug: 'getting-started/introduction'  },
      { label: 'Installation',  slug: 'getting-started/installation'  },
      { label: 'Usage',         slug: 'getting-started/usage'         },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { label: 'Tokens',      slug: 'foundations/tokens' },
      { label: 'Colors',      slug: 'foundations/colors' },
      { label: 'Spacing',     slug: 'foundations/spacing' },
      { label: 'Typography',  slug: 'foundations/typography' },
      { label: 'Border',      slug: 'foundations/border' },
      { label: 'Radius',      slug: 'foundations/radius' },
      { label: 'Icons',       slug: 'components/icons' },
    ],
  },
  {
    label: 'Components',
    groups: [
      {
        label: 'Actions',
        items: [
          { label: 'Button',      slug: 'components/button' },
          { label: 'Icon Button', slug: 'components/icon-button' },
        ],
      },
      {
        label: 'Selection & input',
        items: [
          { label: 'Checkbox',          slug: 'components/checkbox' },
          { label: 'Radio Button',      slug: 'components/radio-button' },
          { label: 'Switch',            slug: 'components/switch' },
          { label: 'Input',             slug: 'components/input' },
          { label: 'Textarea',          slug: 'components/textarea' },
          { label: 'Dropdown',          slug: 'components/dropdown' },
          { label: 'Date Picker',       slug: 'components/date-picker' },
          { label: 'Date Range Picker', slug: 'components/date-range-picker' },
        ],
      },
      {
        label: 'Navigation',
        items: [
          { label: 'Layout',     slug: 'components/layout'    },
          { label: 'Side Bar',   slug: 'components/side-bar'  },
          { label: 'Top Bar',    slug: 'components/top-bar'   },
          { label: 'Pagination', slug: 'components/pagination' },
        ],
      },
      {
        label: 'Data display',
        items: [
          { label: 'Table',      slug: 'components/table' },
          { label: 'Card',       slug: 'components/card' },
          { label: 'Drag & Drop', slug: 'components/drag-drop' },
        ],
      },
      {
        label: 'Feedback & status',
        items: [
          { label: 'Badge',   slug: 'components/badge' },
          { label: 'Toast',   slug: 'components/toast' },
          { label: 'Tooltip', slug: 'components/tooltip' },
          { label: 'Dialog',  slug: 'components/dialog' },
          { label: 'Popover', slug: 'components/popover' },
        ],
      },
    ],
  },
]

/** Flat list of all nav items for lookup */
export function getAllNavItems(): NavItem[] {
  const items: NavItem[] = []
  for (const section of navigation) {
    if (section.items) items.push(...section.items)
    if (section.groups) {
      for (const group of section.groups) items.push(...group.items)
    }
  }
  return items
}
