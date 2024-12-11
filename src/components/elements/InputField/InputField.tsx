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

export function InputField() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log('送信データ:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="task">入力欄</Label>
        <Input id="task" placeholder="タスクを追加する" {...register('task')} />
        {errors.task && <p style={{ color: 'red' }}>{errors.task.message}</p>}
      </div>
      <Button size="lg" className="mt-3">
        追加
      </Button>
    </form>
  )
}
