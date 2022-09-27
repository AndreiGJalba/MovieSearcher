import React from "react";
import style from './style.module.css'

function Circle(props) {
  return (
    <div id={style.wrapper}>
      <div className={style.profileMainLoader}>
        <div className={style.loader}>
          <svg className={style.circularLoader} viewBox="25 25 50 50">
            <circle
              className={style.loaderPath}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#70c542"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Circle;
