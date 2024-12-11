import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(ts|tsx|js|jsx))'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@chromatic-com/storybook'],
  framework: '@storybook/react-vite',

  viteFinal(config) {
    return {
      ...config,
      css: {
        preprocessorOptions: {
          css: {
            additionalData: `
              @import "src/index.css"
            `
          }
        }
      }
    }
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default config
