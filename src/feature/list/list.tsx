import { useMemo, useState } from 'react'
import { InputField } from '@/components/elements/InputField'
import { TaskCheckbox } from '@/components/elements/taskCheckbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MdDeleteForever } from 'react-icons/md'

type Task = {
  id: number
  title: string
}

export function List() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)

  useMemo(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10')
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.status}`)
        }
        const data = await response.json()
        setTasks(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }
    fetchTasks()
  }, [])

  const addTask = async (newTask: string) => {
    if (!newTask) return

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTask,
          userId: 1
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to add task: ${response.status}`)
      }

      const addedTask = await response.json()
      setTasks((prevTasks) => [...prevTasks, { id: addedTask.id, title: addedTask.title }])
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${taskId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.status}`)
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>ToDo List</CardTitle>
        </CardHeader>
        <CardContent>
          <InputField addTask={addTask} />
          {error && <p className="text-red-500">Error: {error}</p>}
          {tasks.map((task) => (
            <div key={task.id} className="flex justify-between items-center">
              <TaskCheckbox task={task.title} />
              <button onClick={() => deleteTask(task.id)}>
                <MdDeleteForever color="red" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default List
