import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
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
  }
}

export default config
