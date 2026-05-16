import { TokensPage }      from './tokens'
import { ColorsPage }      from './colors'
import { TypographyPage }  from './typography'
import { SpacingPage }     from './spacing'
import { BorderPage }      from './border'
import { RadiusPage }      from './radius'

export interface FoundationsEntry {
  title: string
  Component: React.ComponentType
}

export const foundationsRegistry: Record<string, FoundationsEntry> = {
  tokens:     { title: 'Tokens',      Component: TokensPage     },
  colors:     { title: 'Colors',      Component: ColorsPage     },
  typography: { title: 'Typography',  Component: TypographyPage },
  spacing:    { title: 'Spacing',     Component: SpacingPage    },
  border:     { title: 'Border',      Component: BorderPage     },
  radius:     { title: 'Radius',      Component: RadiusPage     },
}
