import React, { FunctionComponent, memo, useCallback, useState } from "react";
import { Todo } from "../models/models";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

interface TodoProps {
  todo: Todo;
  onClick(id: number | string): void;
}

const TodoCard: FunctionComponent<TodoProps> = ({ todo, onClick }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const onClickHandler = useCallback(() => {
    onClick(todo.id);
  }, [todo.id]);

  const onCompletedHandler = useCallback(() => {
    setIsCompleted((isCompleted) => !isCompleted);
  }, [isCompleted]);

  return (
    <Paper sx={{ width: "600px", padding: 2, margin: "2px auto" }}>
      <Box>
        <Typography variant="h5" align="left">
          {todo.title}
        </Typography>
        <Typography variant="h6" align="right">
          id: {todo.id}
        </Typography>
        <Typography variant="h6" align="right">
          userId: {todo.userId}
        </Typography>
        <ButtonGroup>
          <Button
            onClick={onClickHandler}
            variant="contained"
            color="error"
            size={"small"}
          >
            remove
          </Button>
          <Button
            color={isCompleted ? "primary" : "error"}
            onClick={onCompletedHandler}
            variant="text"
            size={"small"}
            sx={{width: 150, fontSize: 12}}
          >
            {isCompleted ? "completed" : "uncompleted"}
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default memo(TodoCard);
