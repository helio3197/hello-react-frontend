import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGreetings } from "../redux/greetings/greetings";

const Greeting = () => {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGreetings());
  }, [dispatch]);

  switch (appState.status) {
    case 'Fetching':
      return (
        <h1>Loading...</h1>
      );
    case 'Failed':
      return (
        <h1>{`Something went wrong: ${appState.error}`}</h1>
      );
    case 'Fullfilled':
      return (
        <h1>{appState.message}</h1>
      );
    default:
      return (
      <h1>Loading...</h1>
    );
  }
};

export default Greeting;
