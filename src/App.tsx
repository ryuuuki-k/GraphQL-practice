import './App.css';
import TodoList from './Components/TodoList';
import AddTodo from './Components/AddTodo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AddTodo />
        <TodoList />
      </header>
    </div>
  );
}

export default App;
