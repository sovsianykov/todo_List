import React, { useCallback, useEffect, useState } from "react";
import { Todo } from "./models/models";
import { todos } from "./todos";
import { Box } from "@mui/material";
import TodoCard from "./components/TodoCard";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    setTodoList(todos);
  }, []);

  const onDeleteHandler = useCallback((id) => {
    setTodoList(todoList => [...todoList].filter(todo => todo.id !== id) )
  }, [todoList]);


  return (
    <Box width="100%" display="flex" flexDirection="column">
      {todoList.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onClick={onDeleteHandler}
        />
      ))}
    </Box>
  );
}

export default App;
