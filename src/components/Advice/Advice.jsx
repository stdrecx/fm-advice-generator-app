import "./Advice.css";
import { useEffect, useReducer } from "react";
import Button from "../Button/Button";

const Advice = () => {
  const defaultState = {
    adviceId: 0,
    advice: "",
  };

  const reducer = (state, action) => {
    if (action.type === "NEW") {
      return {
        adviceId: action.payload.id,
        advice: action.payload.advice,
      };
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const apiCall = async () => {
    try {
      const url = "https://api.adviceslip.com/advice";
      const call = await fetch(url);
      const data = await call.json();
      dispatch({ type: "NEW", payload: data.slip });
      console.log(data.slip);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="cardContent">
          <h5>ADVICE #{state.adviceId}</h5>
          <h1>"{state.advice}"</h1>
        </div>
        <div className="line"></div>
        <Button onClickHandler={apiCall} />
      </div>
    </div>
  );
};

export default Advice;
