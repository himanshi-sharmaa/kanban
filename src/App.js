import './App.css';
import { Button, Modal } from 'antd';
import { useEffect, useState } from "react";
import { lists } from "./Mock";

function App() {

  const [list, setList] = useState(lists);  
  const [draggedData, setDraggedData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => { 
    const savedListData = localStorage.getItem("lists");
    savedListData ? setList(JSON.parse(savedListData)): updateDataInLocalStorage("lists", JSON.stringify(lists));
  }, [])

  const updateDataInLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  }
  const addNewList = (titleData) => {
    const addNewList = { title: titleData, items: []}; 
    const updateList = [...list, addNewList];
    setList(updateList);
  }

  const addNewItemInList = (title, assignee, listTitle) => {
    const newItem = { itemTitle: title, assignedTo: assignee};
    list.forEach((listData)=> {
      if(listData.title===listTitle){
        listData.items = [...listData.items,newItem];
      }
    })
  }

  const dragOver = (event) => {
    event.preventDefault();
  }

  const dragStart = (event, itemId, listId) => {
    event.dataTransfer.setData("itemId", itemId);
    event.dataTransfer.setData("listId", listId);
  }

  const onDrop = (event, id) => {
    const itemId = event.dataTransfer.getData("itemId");
    const listId = event.dataTransfer.getData("listId");
    if(draggedData.itemTitle === itemId) {
      list.forEach((listArray) => {

        if (listArray.title.toLowerCase() === listId.toLowerCase()) {
            const updatedListItems = listArray.items.filter(item => item.itemTitle!==itemId);
            listArray.items = [...updatedListItems];
        }
        if(listArray.title.toLowerCase() === id.toLowerCase()){
          listArray.items = [...listArray.items, draggedData];
          setDraggedData();
        }
    });  
    }
    updateDataInLocalStorage("lists", JSON.stringify(list));
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1 className="heading">Kanban</h1> 
      <div className="button-container-view">  
        <Button className="button-style" onClick={() => addNewList("titleData")}>Add List to the board</Button>
        <Button className="button-style" onClick={() => { addNewItemInList("In title","asignee","In Review")}}>Reset Board</Button>
      </div>
      </header>
      <main className="main-container">
        <div className="list-container"> 
        {list && list.map((listItems)=> {
          return  (<div key={listItems.title} className="list-style" onDragOver={(e)=> dragOver(e)} onDrop={(event) => onDrop(event, listItems.title)}>
          <h2>{listItems.title}</h2>
          {listItems.items.map((item) => {
              return <div draggable key={item.itemTitle} className="list-item" onDragStart={(event)=> { setDraggedData(item); dragStart(event, item.itemTitle, listItems.title)}}>
              <p className="item-title">{item.itemTitle}</p>
              <span className="text">{`Assignee: ${item.assignedTo}`}</span>
              </div>
          })}
         
          </div>);
        })}
       </div>
      </main>
      <footer className="footer-section">All rights reserved</footer>
    </div>
  );
}

export default App;
