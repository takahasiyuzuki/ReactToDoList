import { useState, useCallback } from 'react'
import { InputField } from '@/components/elements/InputField'
import { TaskCheckbox } from '@/components/elements/taskCheckbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MdDeleteForever } from 'react-icons/md'
import { useMemo } from 'react'

const TASKS_PER_PAGE = 10

type Task = {
  id: number
  title: string
}

export function List() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalTasks, setTotalTasks] = useState(0)

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${(currentPage - 1) * TASKS_PER_PAGE}&_limit=${TASKS_PER_PAGE}`
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`)
      }
      const data = await response.json()
      setTasks(data)

      const totalResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
      const totalData = await totalResponse.json()
      setTotalTasks(totalData.length)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }, [currentPage])

  useMemo(() => {
    fetchTasks()
  }, [fetchTasks])

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
      const newTotalTasks = totalTasks + 1
      const lastPage = Math.ceil(newTotalTasks / TASKS_PER_PAGE)
      setTotalTasks(newTotalTasks)
      setCurrentPage(lastPage)

      if (lastPage === currentPage) {
        setTasks((prevTasks) => [...prevTasks, { id: addedTask.id, title: addedTask.title }])
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
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
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
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
          <div className="flex justify-between mt-4">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              Prev
            </Button>
            <span>
              Page {currentPage} of {Math.ceil(totalTasks / TASKS_PER_PAGE)}
            </span>
            <Button
              disabled={currentPage * TASKS_PER_PAGE >= totalTasks}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default List
