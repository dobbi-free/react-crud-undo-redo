import "./App.css";
import Button from "@material-ui/core/Button";
import React, { useReducer, useState } from "react";
import { AppBar, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import UserItem from "./Components/UserItem";
import FormAdd from "./Components/FormAdd";

export const SAVE_CHANGES = "SAVE_CHANGES";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER = "ADD_USER";
export const UNDO = "UNDO";
export const REDO = "REDO";

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case SAVE_CHANGES:
      case DELETE_USER:
      case ADD_USER:
        return {
          past: [...state.past, state.present],
          present: action.present,
          future: [...state.future],
        };
      case UNDO:
        return {
          past: state.past.filter(
            (item, index) => index !== state.past.length - 1
          ),
          present: [...state.past[state.past.length - 1]],
          future: [...state.future, state.present],
        };
      case REDO:
        return {
          past: [...state.past, state.present],
          present: [...state.future[state.future.length - 1]],
          future: state.future.filter(
            (item, index) => index !== state.future.length - 1
          ),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: [
      { id: 0, name: "ss", rocket: "rocket1", twitted: "wwww" },
      { id: 1, name: "aa", rocket: "rocket2", twitted: "sdd" },
      { id: 2, name: "dd", rocket: "rocket3", twitted: "sda" },
    ],
    future: [],
  });

  const [addMode, setAddMode] = useState(false);

  const userItems = state.present.map((userItem) => (
    <UserItem
      id={userItem.id}
      userItem={userItem}
      state={state}
      dispatch={dispatch}
      key={userItem.id}
      name={userItem.name}
      rocket={userItem.rocket}
      twitted={userItem.twitted}
    />
  ));

  const Undo = () => dispatch({ type: UNDO });
  const Redo = () => dispatch({ type: REDO });

  return (
    <div>
      <AppBar position={"static"}>
        <Container>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <h1>Cosmonauts</h1>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              xs={3}
            >
              <Grid>
                <Button
                  disabled={state.past.length <= 0}
                  onClick={Undo}
                  variant="contained"
                >
                  Undo
                </Button>
              </Grid>
              <Grid>
                <Button
                  disabled={state.future.length <= 0}
                  onClick={Redo}
                  variant="contained"
                >
                  Redo
                </Button>
              </Grid>
              <Grid>
                <Button onClick={(e) => setAddMode(true)} variant="contained">
                  Add new
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid container xs={3}>
            <h2>Name</h2>
          </Grid>
          <Grid container xs={3}>
            <h2>Rocket</h2>
          </Grid>
          <Grid container xs={3}>
            <h2>Twitted</h2>
          </Grid>
          <Grid container xs={3} justify="center" alignItems="center">
            <h2>Actions</h2>
          </Grid>
        </Grid>
      </Container>
      {addMode && (
        <FormAdd dispatch={dispatch} state={state} setAddMode={setAddMode} />
      )}
      <Container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          xs={12}
        >
          {userItems}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
