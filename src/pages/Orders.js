import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import { FirebaseContext } from "../firebase/index";
import Order from "../components/Order";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const classes = useStyles();
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    firebase.db
      .collection("orders")
      .where("completed", "==", false)
      .onSnapshot(handleSnapshot);
  };

  const handleSnapshot = (snapshot) => {
    const orders = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setOrders(orders);
  };

  return (
    <>
      <div className={classes.header}>
        <Typography color="primary" variant="h2">
          Orders
        </Typography>
      </div>
      <Divider />
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </>
  );
};

export default Orders;
