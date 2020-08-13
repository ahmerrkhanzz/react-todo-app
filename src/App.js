import React, { useState, useEffect } from "react";
import "./App.css";
import {
  TextField,
  Button,
  Container,
  makeStyles,
  createStyles,
  createMuiTheme,
  Grid,
  Theme,
  CircularProgress
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    loader: {
      marginTop: theme.spacing(10)
    }
  })
);

function App() {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs)
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().todo,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <ThemeProvider theme={theme}>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div className="App">
              <h1>My Tasks</h1>
              <form noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Write Task"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!input}
                  onClick={addTodo}
                  type="submit"
                >
                  Add
                </Button>
              </form>
              
              {todos.map((todo) => (
                <Todo todo={todo} key={todo.id} />
              ))}
              {todos.length ? '' : <CircularProgress color="secondary" className={classes.loader} />}
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
