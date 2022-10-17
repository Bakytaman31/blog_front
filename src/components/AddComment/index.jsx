import React from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams } from 'react-router-dom';
import axios from "../../axios.js";

export const Index = () => {

  const [text, setText] = React.useState("");
  const { id } = useParams();

  const onSubmitHandler = async (event) => {
    // event.preventDefault(); 
    await axios.post(`/comments/${id}`, {text})
  }


  return (
    <>
      <div className={styles.root}>
        <div className={styles.form}>
          <form onSubmit={(event) => onSubmitHandler(event)}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button type="submit" variant="contained">Отправить</Button>
          </form>
        </div>
      </div>
    </>
  );
};
