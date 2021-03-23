import React, { useState } from "react";

function ListInput(props) {
    const [formValue, setFormValue] = useState();
    return(
        <div>
        <h2>Add List Details</h2>
        <form onSubmit={(event) => { props.listTitle(formValue);event.preventDefault()}}>
        <input
         type="text"
         className="form-control"
         placeholder="In progress"
         value={formValue}
         onChange={(e) => {setFormValue(e.target.value)}}
         name="List Title"
       />
       <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default ListInput;