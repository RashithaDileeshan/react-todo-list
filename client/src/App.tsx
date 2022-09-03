import React from 'react';
// import './App.css';
import { Route, Switch } from "react-router-dom";
import ToDoList from './pages/todoList';

function App() {
  return (
    <Switch>
      <Route>
        <Route exact path="/" component={ToDoList} />
      </Route>
    </Switch>
  );
}

export default App;
