import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FirebaseContext } from "../firebase/index";

const useStyles = makeStyles({
  label: {
    marginLeft: "1rem",
    fontWeight: "bold",
    fontSize: 20,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: "1rem",
  },
});

const Order = ({ order }) => {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const { firebase } = useContext(FirebaseContext);

  const setDeliveryTime = async (id) => {
    try {
      await firebase.db.collection("orders").doc(id).update({
        deliveryTime: time,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardContent className={classes.cardBody}>
        <Typography variant="h4" component="h2">
          {order.id}
        </Typography>
        {order.order.map((dish) => (
          <Typography
            key={dish.id}
            variant="overline"
            className={classes.label}
          >
            {dish.amount} {dish.name}
          </Typography>
        ))}
        <Typography variant="overline" className={classes.label}>
          Total: $ {order.total}
        </Typography>
        {order.deliveryTime === 0 && (
          <>
            <Typography variant="overline">Delivery Time</Typography>
            <TextField
              type="number"
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setDeliveryTime(order.id)}
            >
              Set Time
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Order;
