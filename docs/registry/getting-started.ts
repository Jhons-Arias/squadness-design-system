import { IntroductionPage } from './getting-started/introduction'
import { InstallationPage } from './getting-started/installation'
import { UsagePage }        from './getting-started/usage'

export interface GettingStartedEntry {
  title: string
  Component: React.ComponentType
}

export const gettingStartedRegistry: Record<string, GettingStartedEntry> = {
  introduction: { title: 'Introduction', Component: IntroductionPage },
  installation: { title: 'Installation', Component: InstallationPage },
  usage:        { title: 'Usage',        Component: UsagePage        },
}
