import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../style";
import { DELETE_USER, SAVE_CHANGES } from "../App";

const UserItem = (props) => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(props.userItem);

  const saveForm = () => {
    const newState = { ...props.state, present: [...props.state.present] };
    const i = props.state.present.findIndex((o) => o.id === form.id);
    newState.present[i] = form;
    props.dispatch({ type: SAVE_CHANGES, present: [...newState.present] });
    setEditMode(false);
  };

  const changeHandler = (e, name) => {
    setForm({ ...form, [name]: e.target.value });
  };

  const deleteUser = () => {
    const newState = { ...props.state, present: [...props.state.present] };
    newState.present = props.state.present.filter((n) => n.id !== props.id);
    props.dispatch({ type: DELETE_USER, present: [...newState.present] });
  };

  return (
    <Grid xs={12}>
      {!editMode && (
        <Grid container xs={12}>
          <Grid xs={3}>
            <h4>{props.name}</h4>
          </Grid>
          <Grid xs={3}>
            <h4>{props.rocket}</h4>
          </Grid>
          <Grid xs={3}>
            <h4>{props.twitted}</h4>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            xs={3}
          >
            <Grid xs={8}>
              <Button
                className={classes.myButton}
                onClick={(e) => {
                  setEditMode(true);
                }}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            </Grid>
            <Grid xs={4} spacing={3}>
              <Button
                onClick={deleteUser}
                startIcon={<DeleteIcon />}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {editMode && (
        <Grid className={classes.inputBlock} container xs={12}>
          <Grid xs={3}>
            <TextField
              value={form.name}
              name={"name"}
              placeholder={"name"}
              onChange={(e) => changeHandler(e, "name")}
            />
          </Grid>
          <Grid xs={3}>
            <TextField
              value={form.rocket}
              name={"rocket"}
              placeholder={"rocket"}
              onChange={(e) => changeHandler(e, "rocket")}
            />
          </Grid>
          <Grid xs={3}>
            <TextField
              value={form.twitted}
              name={"twitted"}
              placeholder={"twitted"}
              onChange={(e) => changeHandler(e, "twitted")}
            />
          </Grid>
          <Grid xs={3}>
            <Button
              className={classes.myButton}
              onClick={saveForm}
              variant="contained"
              color="primary"
            >
              save
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UserItem;
