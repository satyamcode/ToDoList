import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Element(props) {
  const { element, updateButton, deleteElement, id } = props.data;

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {element.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {element.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            id.current = element._id;
            updateButton(element);
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={() => {
            id.current = element._id;
            deleteElement();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
