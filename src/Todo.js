import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const updateTodo = (event) => {
    event.preventDefault();
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(event) => setOpen(false)}>
        <div className={classes.paper}>
          <h4>Update Todo</h4>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              placeholder={props.todo.text}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
            <Button variant="contained" color="primary" type="submit" onClick={updateTodo}>
              Update
            </Button>
          </form>
        </div>
      </Modal>
      <List component="nav">
        <ListItem button>
          <ListItemText primary={props.todo.text} secondary="Description" />
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => setOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          >
            Delete Me
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default Todo;
