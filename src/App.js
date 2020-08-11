import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().todo }))
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
    <div className="App">
      <h1>React Todo List App</h1>
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
    </div>
  );
}

export default App;
