import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import useStyles from "../style";
import { ADD_USER } from "../App";

const FormAdd = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    id: "",
    name: "",
    rocket: "",
    twitted: "",
  });

  const saveForm = () => {
    if (form.name && form.rocket && form.twitted) {
      const newState = { ...props.state, present: [...props.state.present] };
      newState.present.unshift({ ...form, id: props.state.present.length });
      props.dispatch({ type: ADD_USER, present: [...newState.present] });
      props.setAddMode(false);
    }
  };

  const addTwitted = (e) => {
    setForm({ ...form, twitted: e.target.value });
  };
  const addName = (e) => {
    setForm({ ...form, name: e.target.value });
  };
  const addRocket = (e) => {
    setForm({ ...form, rocket: e.target.value });
  };
  return (
    <Container>
      <Grid
        className={classes.addBlock}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid container xs={3}>
          <TextField
            value={form.twitted}
            name={"twitted"}
            placeholder={"twitted"}
            onChange={addTwitted}
          />
        </Grid>
        <Grid container xs={3}>
          <TextField
            value={form.name}
            name={"name"}
            placeholder={"name"}
            onChange={addName}
          />
        </Grid>
        <Grid container xs={3}>
          <TextField
            value={form.rocket}
            name={"rocket"}
            placeholder={"rocket"}
            onChange={addRocket}
          />
        </Grid>
        <Grid container xs={3}>
          <Button
            className={classes.myButton}
            onClick={saveForm}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormAdd;
