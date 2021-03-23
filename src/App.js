import './App.css';
import { Button } from 'antd';
import React,{ useEffect, useState } from "react";
import { lists } from "./Mock";
import ListInput from './ListInput';
import ItemInput from './ItemInput';

function App() {

  const [list, setList] = useState(lists);  
  const [draggedData, setDraggedData] = useState();
  const [addListInProgress, setAddListInProgress] = useState(false);
  const [addItemInProgress, setAddItemInProgress] = useState(false);
  const [updateList, setUpdateList] = useState('')

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
    updateDataInLocalStorage(list);
  }

  const addNewItemInList = (title, assignee, listTitle) => {
    const newItem = { itemTitle: title, assignedTo: assignee};
    list.forEach((listData)=> {
      if(listData.title===listTitle){
        listData.items = [...listData.items,newItem];
      }
    })
    updateDataInLocalStorage(list);
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
      <h1 className="heading" onClick={() => {setAddItemInProgress(false); setAddListInProgress(false)}}>Kanban</h1> 
      <div className="button-container-view">  
        <Button className="button-style" onClick={() => {
          setAddListInProgress(true);
        }}>Add List</Button>
      </div>
      </header>
      <main className="main-container">
      {addListInProgress && <ListInput listTitle={(title) => {addNewList(title); setAddListInProgress(false)}}/>}
      {addItemInProgress&& updateList!=="" && <ItemInput itemDetail={(title, assignee) => {console.log("Here"); addNewItemInList(title,assignee, updateList); setAddItemInProgress(false)}}/>}
      { !addListInProgress && !addItemInProgress &&
        <div className="list-container"> 
        {list && list.map((listItems)=> {
          return  (<div key={listItems.title} className="list-style" onDragOver={(e)=> dragOver(e)} onDrop={(event) => onDrop(event, listItems.title)}>
          <div className="item-header">
            <span className="heading">{listItems.title}</span> 
            <Button className="delete-button" onClick={()=> {setUpdateList(listItems.title); setAddItemInProgress(true)}}>+</Button>
          </div>
          {listItems.items.map((item) => {
              return <div draggable key={item.itemTitle} className="list-item" onDragStart={(event)=> { setDraggedData(item); dragStart(event, item.itemTitle, listItems.title)}}>
              <div className="item-header">
                <span className="item-title">{item.itemTitle}</span> 
                <Button className="delete-button" onClick={() => { console.log("Delete current element from list")}}>X</Button>
              </div>
              <span className="text">{`Assignee: ${item.assignedTo}`}</span>
              </div>
          })}
         
          </div>);
        })}
       </div>
      }
      </main>
      <footer className="footer-section">All rights reserved</footer>
    </div>
  );
}

export default App;
