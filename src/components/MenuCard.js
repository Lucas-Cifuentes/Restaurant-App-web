import React, { useContext, useRef } from "react";
import { FirebaseContext } from "../firebase/index";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  status: {
    width: "90%",
    margin: "0.5rem auto",
  },
  container: {
    display: "flex",
    marginTop: "1rem",
  },
  cover: {
    width: 250,
  },
  cardBody: {
    display: "flex",
    flexDirection: "row",
  },
  label: {
    marginLeft: "1rem",
    fontWeight: "bold",
  },
});

const MenuCard = ({ saucer }) => {
  const classes = useStyles();
  const statusRef = useRef(saucer.status);
  const { image, name, category, description, price, status, id } = saucer;
  const { firebase } = useContext(FirebaseContext);

  const updateStatus = () => {
    const status = statusRef.current.value === "true";

    try {
      firebase.db.collection("products").doc(id).update({
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.container}>
      <CardMedia className={classes.cover} image={image} title={name} />
      <CardContent>
        <Typography variant="h2" component="h2">
          {name}
        </Typography>
        <div className={classes.cardBody}>
          <Typography variant="overline" component="div">
            Category:
          </Typography>
          <Typography
            className={classes.label}
            variant="subtitle1"
            component="div"
            color="primary"
          >
            {category.toUpperCase()}
          </Typography>
        </div>
        <Typography variant="overline" component="div">
          {description}
        </Typography>
        <div className={classes.cardBody}>
          <Typography variant="overline" component="div">
            Price:
          </Typography>
          <Typography
            className={classes.label}
            variant="subtitle1"
            component="div"
            color="primary"
          >
            $ {price}
          </Typography>
        </div>
        <Typography variant="overline" component="div">
          Status:
        </Typography>
        <select
          value={status}
          ref={statusRef}
          onChange={() => updateStatus()}
          className={classes.status}
          id="status"
        >
          <option value="true">Active</option>
          <option value="false">InActive</option>
        </select>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
