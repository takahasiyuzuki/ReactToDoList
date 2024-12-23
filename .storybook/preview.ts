import '../src/app/globals.css'
import { Preview } from '@storybook/react'

export const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
