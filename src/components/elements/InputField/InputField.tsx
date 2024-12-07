import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InputField() {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">入力欄</Label>
          <Input id="name" placeholder="タスクを追加する" />
        </div>
      </div>
    </form>
  )
}
export default InputField
