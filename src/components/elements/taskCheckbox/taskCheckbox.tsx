import { Checkbox } from '@/components/ui/checkbox'

type TaskProps = {
  task: string
}

export function TaskCheckbox({ task }: TaskProps) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="leading-none mb-3">
        <label htmlFor="terms1" className="text-sm font-medium leading-none cursor-pointer">
          {task}
        </label>
      </div>
    </div>
  )
}

export default TaskCheckbox
