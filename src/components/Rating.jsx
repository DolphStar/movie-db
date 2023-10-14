import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import React from "react";

const Rating = ({rate}) => {
  const percentage = Math.trunc(rate*10);
    return (
    <div className="rating-circle">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth = {10}
        styles={buildStyles({

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "round",
          

          // Text size
          textSize: "30px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: "#646cff",
          textColor: "#ffffff",
          trailColor: "#d6d6d6"
        })}
      />
      
    </div>
  );
};

export default Rating;
