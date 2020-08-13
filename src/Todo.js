import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
  },
}));

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 45 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const Todo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [modalStyle] = React.useState(getModalStyle);
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

  const modalBody = (
    <Container component="main" maxWidth="xs">
      <div style={modalStyle} className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Task
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            placeholder={props.todo.text}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateTodo}
            disabled={!input}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );

  return (
    <>
      <Modal open={open} onClose={(event) => setOpen(false)}>
        {modalBody}
      </Modal>
      <List component="nav">
        <ListItem button>
          <ListItemText
            primary={props.todo.text}
            secondary={
              props.todo.timestamp
                ? moment(new Date(props.todo.timestamp.toDate())).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )
                : ""
            }
          />
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
