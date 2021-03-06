import React, { useState } from "react";

function ItemInput(props) {
    const [title, setTitle] = useState();
    const [assignee, setAssignee] = useState();
    return(
        <div>
        <h2>Add Item Details</h2>
        <form 
        className="form-style"
        onSubmit={(event) => {
             props.itemDetail(title, assignee);
             event.preventDefault()
            }}>
        <input
         type="text"
         className="form-input"
         placeholder="Title"
         value={title}
         onChange={(e) => {setTitle(e.target.value)}}
         name="Title"
       />
        <input
         type="text"
         className="form-input"
         placeholder="Assignee"
         value={assignee}
         onChange={(e) => {setAssignee(e.target.value)}}
         name="Assignee"
       />
       <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default ItemInput;