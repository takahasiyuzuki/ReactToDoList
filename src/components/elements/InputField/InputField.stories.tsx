import { InputField } from './InputField'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InputField> = {
  component: InputField,
  title: 'Components/Elements/InputField'
}
export default meta
type Story = StoryObj<typeof InputField>

export const Primary: Story = {
  args: {}
}
