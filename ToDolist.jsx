import React from "react";
import ReactDOM from "react-dom";

const ToDolist = (props) => {
  return (
    <>
    
      <div className="ToDostyle">
        <i
          className="bx bxs-minus-circle"
          onClick={() => props.onSelect(props.id)}
        ></i>

        <li> {props.text} </li>
        <li>
          <i class="bx bx-edit"
          onClick={() => props.onEdit(props.id)}
          ></i>
        </li>
      </div>
    </>
  );
};
export default ToDolist;
