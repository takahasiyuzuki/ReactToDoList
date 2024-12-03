import { AddButton } from './AddButton'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AddButton> = {
  component: AddButton,
  title: 'Components/Elements/AddButton'
}
export default meta
type Story = StoryObj<typeof AddButton>

export const Primary: Story = {
  args: {}
}
