import React, { useCallback, useReducer, useState } from "react";
import { ActionType, Todo } from "./models/models";
import { todos, User, users } from "./todos";
import {
  Box,
  Button,
  FormGroup,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Select,
} from "@mui/material";
import TodoCard from "./components/TodoCard";
import { v4 as uuidv4 } from "uuid";

const initialState = todos;

function App() {
  const [username, setUsername] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  function reducer(state: Todo[] = initialState, action: ActionType) {
    switch (action.type) {
      case "REMOVE":
        return state.filter((todo) => todo.id !== action.payload);
      case "COMPLETED":
        const index = state.findIndex((todo) => todo.id === action.payload);
        const completedTodo = {
          ...state[index],
          completed: !state[index].completed,
        };
        const newState = [...state];
        newState[index] = completedTodo;
        return newState;
      case "SUBMIT":
        const selectedUser: User = users.find((u) => u.username === username)!;
        const newTodo: Todo = {
          id: uuidv4(),
          title: title,
          userId: selectedUser.id,
          completed: false,
        };
        return [...state, newTodo];
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const onDeleteHandler = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);
  const onCompleteHandler = useCallback((id) => {
    dispatch({ type: "COMPLETED", payload: id });
  }, []);

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
    setTitle("");
  }, []);
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );
  const handleChange = (event: SelectChangeEvent) => {
    setUsername(event.target.value);
  };

  return (
    <Box
      maxWidth="620px"
      display="flex"
      p={2}
      flexDirection="column"
      sx={{ margin: "0 auto", transition: "2s ease-in-out" }}
    >
      <FormGroup>
        <TextField
          sx={{ width : "100%",background: "#fff", margin: "5px auto" }}
          label="title"
          value={title}
          variant="filled"
          onChange={onChangeHandler}
        ></TextField>
        <InputLabel id="demo-simple-select-label">users</InputLabel>
        <Select
          sx={{ background: "#ffffff" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={username}
          label="user"
          onChange={handleChange}
        >
          {users.map((u) => (
            <MenuItem value={u.username} key={u.id}>
              {" "}
              {u.username}
            </MenuItem>
          ))}
        </Select>
        <Button
          onClick={onSubmitHandler}
          sx={ {margin: "5px 0"}}
          color="primary"
          size={"small"}
          disabled={!username}
        >
          Add Task
        </Button>
      </FormGroup>
      {state.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onClick={onDeleteHandler}
          onComplete={onCompleteHandler}
        />
      ))}
    </Box>
  );
}

export default App;
