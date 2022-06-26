import React, { FunctionComponent, memo, useCallback } from "react";
import { Todo } from "../models/models";
import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from "@mui/material";

interface TodoProps {
  todo: Todo;
  onClick(id: number | string): void;
  onComplete(id: number | string): void;

}

const TodoCard: FunctionComponent<TodoProps> = ({ todo, onClick,onComplete }) => {
  const onClickHandler = useCallback(() => {
    onClick(todo.id);
  }, [todo.id]);

  const onCompletedHandler = useCallback(() => {
    onComplete(todo.id)
  }, [todo.id]);

  return (
    <Paper sx={{ width: "100%", margin: "2px auto" }}>
      <Box p={2}>
        <Typography variant="h5" align="left">
          {todo.title}
        </Typography>
        <Typography variant="body2" align="right">
         Todo id: {todo.id}
        </Typography>
        <Typography variant="subtitle2" align="right">
          userId: {todo.userId}
        </Typography>
        <ButtonGroup>
          <Button
            onClick={onClickHandler}
            variant="contained"
            color="error"
          >
            remove
          </Button>
          <Button
            color={todo.completed ? "success" : "error"}
            onClick={onCompletedHandler}
            variant="text"
            sx={{width: 120}}
          >
            { todo.completed ? <CheckIcon/> : "uncompleted"}
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default memo(TodoCard);
