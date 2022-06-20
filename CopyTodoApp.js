import { useEffect, useState } from "react";
import "./App.css";
import ToDolist from "./ToDolist";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  // console.log(list);

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function Todoapp() {
  const [inputlist, setInputList] = useState("");
  const [item, setItem] = useState(getLocalItems());

  const itemEvent = (event) => {
    setInputList(event.target.value);
  };

  const listOfitems = (event) => {

    event.preventDefault();

    setItem((oldItem) => {
      
      const allInputData = {
        id : Math.random().toString(16).slice(2),
        name: inputlist
        
      };
      
      console.log(allInputData);
    

      // console.log("deleted",allInputData);
      return [...oldItem, allInputData.name];
    });
    setInputList("");

  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(item));
  }, [item]);

  const deleteItem = ( id) => {
    console.log("id", id);
    setItem((oldItem) => {
      return oldItem.filter((index) => {
        return index != id;
      });
    });
  };
  return (
    <div className="App">
      <div className="Continer">
        <h1>To Do List</h1>
        <input
          type="text"
          className="listitem"
          placeholder="Add to list"
          onChange={itemEvent}
          value={inputlist}
        />
        <button onClick={listOfitems} className="submitbtn">
          +
        </button>
        <ol>
          {item.map((itemlist) => {
            return (
              <ToDolist
                //  key={index}
                id={itemlist.id}
                text={itemlist}
                onSelect={deleteItem}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Todoapp;

// const allInputData = {id : new Date().getTime().toString, name:inputData }
// setItem([...item, allInputData]);
// setInputData('')








function Todoapp() {
    const [inputlist, setInputList] = useState([]);
    const [item, setItem] = useState(getLocalItems());
  
    const itemEvent = (event) => {
      setInputList(event.target.value);
    };
  
    const listOfitems = (event) => {
  
      event.preventDefault();
      // const allInputData = {
      //   id:Math.random().toString(16).slice(2),
      //    name: inputlist
      //  };
  
      setItem((oldItem) =>([...oldItem, {name:inputlist,id:Math.random().toString(16)}]));
      setInputList("");
      // console.log("allinpuit",allInputData);
  
    };
  
    useEffect(() => {
      localStorage.setItem("lists", JSON.stringify(item));
    }, [item]);
  
    const deleteItem = (id) => {
      console.log("text", id);
      setItem( 
        item.filter((x)=>(
          x.id !== id 
        ))
      )
    };
    return (
      <div className="App">
        <div className="Continer">
          <h1>To Do List</h1>
          <input
            type="text"
            className="listitem"
            placeholder="Add to list"
            onChange={itemEvent}
            value={inputlist}
          />
          <button onClick={listOfitems} className="submitbtn">
            +
          </button>
          <ol>
          {console.log("item",item)}
            {item.map((itemlist) => {
              return (
                <ToDolist
                   key={itemlist.id}
                  id={itemlist.id}
                  text={itemlist.name}
                  onSelect={deleteItem}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
  
  export default Todoapp;