import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import styles from './app.module.css';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.counter}>
      <h2>Counter Component</h2>
      <p data-testid="counter-value">Count: {count}</p>
      <button data-testid="increment-btn" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button data-testid="decrement-btn" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button data-testid="reset-btn" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.todoList}>
      <h2>Todo List</h2>
      <div>
        <input
          data-testid="todo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button data-testid="add-todo-btn" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <ul data-testid="todo-list">
        {todos.map((todo, index) => (
          <li key={index} data-testid={`todo-item-${index}`}>
            {todo}
            <button
              data-testid={`remove-todo-${index}`}
              onClick={() => removeTodo(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.contactForm}>
      <h2>Contact Form</h2>
      {!submitted ? (
        <form data-testid="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              data-testid="name-input"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              data-testid="email-input"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              data-testid="message-input"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>
          <button data-testid="submit-btn" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <div data-testid="success-message">
          <p>Thank you, {formData.name}! Your message has been submitted.</p>
          <button onClick={() => setSubmitted(false)}>Submit Another</button>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 data-testid="app-title">Percy Sample NX App</h1>
        <nav>
          <Link to="/" data-testid="home-link">Home</Link>
          <Link to="/counter" data-testid="counter-link">Counter</Link>
          <Link to="/todos" data-testid="todos-link">Todos</Link>
          <Link to="/contact" data-testid="contact-link">Contact</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <div data-testid="home-page">
                <h2>Welcome to Percy Sample NX App</h2>
                <p>This is a sample React application with Cypress e2e testing.</p>
                <p>Explore the different pages using the navigation above.</p>
              </div>
            }
          />
          <Route path="/counter" element={<Counter />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
