import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = z.object({
  task: z.string().min(1, '入力欄は必須です')
})

type FormData = z.infer<typeof schema>

type InputFieldProps = {
  addTask: (task: string) => void
}

export function InputField({ addTask }: InputFieldProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = (data: FormData) => {
    addTask(data.task)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="flex space-x-2">
          <Input id="task" placeholder="タスクを追加する" {...register('task')} />
          <Button size="lg" disabled={!isValid}>
            追加
          </Button>
        </div>
        {errors.task && <p className="text-left text-red-500 mt-1">{errors.task.message}</p>}
      </div>
    </form>
  )
}

export default InputField
