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
  const [inputText, setInputText] = useState([]);
  const [item, setItem] = useState(getLocalItems());
  const [togglebtn, setTogglebtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [dark, setDark] = useState(true);

  const itemEvent = (event) => {
    setInputText(event.target.value);
  };

  const listOfitems = (event) => {
    event.preventDefault();

    if (inputText && !togglebtn) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputText };
          }
          setTogglebtn(true);
          setInputText("");
          setIsEditItem(null);
          return elem;
        })
      );
    } else if (!inputText) {
      alert("Please fill the input text");
    } else {
      setItem((oldItem) => {
        const allInputData = {
          id: Math.random().toString(16).slice(2),
          name: inputText,
        };

        console.log(allInputData);
        // console.log("deleted",allInputData);
        return [...oldItem, allInputData];
      });
    }
    setInputText("");
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(item));
  }, [item]);

  const deleteItem = (id) => {
    console.log("text", id);
    setItem(item.filter((x) => id !== x.id));
  };
  const editItem = (id) => {
    let newEditItem = item.find((x) => x.id === id);
    console.log("text", newEditItem);
    setTogglebtn(false);
    setInputText(newEditItem.name);
    setIsEditItem(id);
    console.log("text", newEditItem);
  };

  const RemoveAll = () => {
    setItem([]);
  };
  const Theme = {
    backgroundColor: dark ? "blueviolet" :   "#333",
    color: dark ? "#fff" : "#333",
  };
  const setTheme = () => {
    if (dark != true) {
      setDark(true)
      }
      else {
        setDark(false)
      }
 }

  return (
    <>
    
      <div className="App" style={Theme}>
      <button onClick={setTheme}>Dark Mode</button>
        <div className="Continer">
          <h1>To Do List</h1>
          <input
            type="text"
            className="listitem"
            placeholder="Add to list"
            onChange={itemEvent}
            value={inputText}
          />
          {togglebtn ? (
            <button onClick={listOfitems} className="submitbtn">
              +
            </button>
          ) : (
            <i class="bx bx-edit" onClick={listOfitems}></i>
          )}

          <ol>
            {console.log("item", item)}
            {item.map((itemlist) => {
              return (
                <ToDolist
                  key={itemlist.id}
                  id={itemlist.id}
                  text={itemlist.name}
                  onSelect={deleteItem}
                  onEdit={editItem}
                />
              );
            })}
          </ol>
          <button className="Removebtn" onClick={RemoveAll}>
            Remove All
          </button>
        </div>
      </div>
    </>
  );
}

export default Todoapp;

// const allInputData = {id : new Date().getTime().toString, name:inputData }
// setItem([...item, allInputData]);
// setInputData('')
