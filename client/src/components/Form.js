import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "../axios";
import { useEffect, useState } from "react";

function Form(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { setList, list, add, setAdd, update, setUpdate, value, id } =
    props.data;

  useEffect(() => {
    if (update) {
      setTitle(value.title);
      setDescription(value.description);
    }
  }, [update, value]);

  const saveValue = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      if (add) {
        const { data } = await axios.post(
          "/api/personal/addelement",
          { title: title, description: description },
          config
        );
        setList(list.concat(data));
        setAdd(!add);
      } else {
        await axios.post(
          `/api/personal/editelement/${id.current}`,
          { title: title, description: description },
          config
        );
        const index = list.findIndex((element) => element._id === value._id);
        list[index].element = {
          title: title,
          description: description,
        };
        setList(list);
        setUpdate(!update);
      }
    } catch (error) {
      if (add) {
        console.log(error);
        console.log("Can't add the element");
      } else {
        console.log("Can't update the element");
      }
    }
  };

  return (
    <div>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Form
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Please kindly fill the details of the Note
            </Typography>
            <form onSubmit={saveValue}>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter Title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    multiline
                    minRows={4}
                    placeholder="Type your hobbies here"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {add ? "Add" : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Form;
