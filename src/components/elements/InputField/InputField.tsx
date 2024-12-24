import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
      <div>
        <Label htmlFor="task">入力欄</Label>
        <Input id="task" placeholder="タスクを追加する" {...register('task')} />
        {errors.task && <p style={{ color: 'red' }}>{errors.task.message}</p>}
      </div>
      <Button size="lg" className="mt-2 mb-5" disabled={!isValid}>
        追加
      </Button>
    </form>
  )
}

export default InputField
