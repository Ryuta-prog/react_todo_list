import { useMemo, useState } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const counts = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const active = total - completed
    return { total, completed, active }
  }, [tasks])

  const handleAdd = () => {
    const text = input.trim()
    if (!text) return
    const newTask = { id: Date.now(), text, completed: false }
    setTasks(prev => [newTask, ...prev])
    setInput('')
  }

  const handleToggle = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="App" style={{ maxWidth: 560, margin: '40px auto', padding: 16 }}>
      <h1>ToDo List</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="タスクを入力（例：掃除）"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleAdd}>保存</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        全てのタスク：{counts.total}　完了済み：{counts.completed}　未完了：{counts.active}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #ddd', padding: 8, borderRadius: 6 }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            <span style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#888' : '#222' }}>
              {task.text}
            </span>
            <button disabled>編集</button>
            <button disabled>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
