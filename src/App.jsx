import { useMemo, useState } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

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

  const handleDelete = (id) => {
    if (!window.confirm('本当によろしいですか？')) return
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const handleEditStart = (task) => {
    setEditingId(task.id)
    setEditingText(task.text)
    setInput('')
  }

  const handleEditSave = (id) => {
    const text = editingText.trim()
    if (!text) return
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, text } : t))
    )
    setEditingId(null)
    setEditingText('')
    setEditingText('')
    setInput('')
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingText('')
    setInput('')
  }

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') handleEditSave(id)
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
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                  style={{ flex: 1, padding: 8 }}
                />
                <button onClick={() => handleEditSave(task.id)}>保存</button>
                <button onClick={handleEditCancel}>キャンセル</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#888' : '#222' }}>
                  {task.text}
                </span>
                <button onClick={() => handleEditStart(task)}>編集</button>
              </>
            )}
            <button onClick={() => handleDelete(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
