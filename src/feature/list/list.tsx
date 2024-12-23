import { useState } from 'react'
import { InputField } from '@/components/elements/InputField'
import { TaskCheckbox } from '@/components/elements/taskCheckbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function List() {
  const [tasks, setTasks] = useState<string[]>([])

  const addTask = (newTask: string) => {
    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, newTask])
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>ToDo List</CardTitle>
        </CardHeader>
        <CardContent>
          <InputField addTask={addTask} />
          {tasks.map((task, index) => (
            <TaskCheckbox key={index} task={task} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default List
