import { List } from './list'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof List> = {
  component: List,
  title: 'Components/Feature/list'
}
export default meta

type Story = StoryObj<typeof List>

export const Primary: Story = {
  args: {
    task: 'タスク'
  }
}
