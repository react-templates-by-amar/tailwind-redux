# useArray

A hook for managing arrays with helper methods.

## Usage

```typescript
import { useArray } from '@/hooks';

function ArrayComponent() {
  const { array, push, update, remove, clear } = useArray<number>([1, 2, 3]);

  return (
    <div>
      <ul>
        {array.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => update(index, item * 2)}>Double</button>
            <button onClick={() => remove(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => push(Math.floor(Math.random() * 100))}>
        Add Random Number
      </button>
      <button onClick={clear}>Clear All</button>
    </div>
  );
}
```

## API

### Parameters

- `initialArray` (Array): The initial array (default: `[]`)

### Returns

An object with:
- `array` (Array): The current array
- `set` (function): Replace the entire array
- `push` (function): Add an item to the end of the array
- `update` (function): Update an item at a specific index
- `remove` (function): Remove an item at a specific index
- `clear` (function): Clear the array
- `filter` (function): Filter the array using a callback

## Example: Todo List

```typescript
function TodoList() {
  const [input, setInput] = useState('');
  const { array: todos, push, remove } = useArray<string>([]);

  const addTodo = () => {
    if (input.trim()) {
      push(input);
      setInput('');
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => remove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
