import { TaskCheckbox } from './taskCheckbox'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TaskCheckbox> = {
  component: TaskCheckbox,
  title: 'Components/Elements/CheckBox'
}
export default meta

type Story = StoryObj<typeof TaskCheckbox>

export const Primary: Story = {
  args: {
    task: 'タスク'
  }
}
