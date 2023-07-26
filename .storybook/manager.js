import { addons } from '@storybook/addons'
import theme from './aetherTheme'

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
})
