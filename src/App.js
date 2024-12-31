import { useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";

function App() {
  const [input, setInput] = useState("");
  const [store, setStore] = useState([]);
  const [editId, setEditId] =useState(0)


  const handleAddOrEdit = () => 
    {
      if(input !== ''){
    setStore([...store, { list: input, id: Date.now(), status: false }]);
    setInput("");
    }
 
    if (editId) {
      const editTodo = store.find((item) => item.id === editId);
    
      if (editTodo) {
        const updateTodo = store.map((item) =>
          item.id === editTodo.id
            ? { ...item, list: input } 
            : item 
        );
    
        setStore(updateTodo);
        setEditId(0);
        setInput("");
      }
    }
  }
    

  

  

  // delete

  const onDelete = (id) => {
    setStore(store.filter((data) => data.id !== id));
  };

  // complete
  const onComplite = (id) => {
    let complete = store.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setStore(complete);
  };


  // Edit
  const onEdit =(id)=>{
    let edit = store.find( (data)=> data.id === id )
    setInput(edit.list)
    setEditId(edit.id)
    console.log(edit)

  }




  return (
    <div className="center">
       <h1>Crud</h1>
      <input type="text" value={input} onChange={(abc) => setInput(abc.target.value)}/>

       {<button 
       onClick={handleAddOrEdit} >
        {editId ? 'EDIT' :'ADD'}</button> }
       
      <div>

         <ul>
          {store.map((data) => (
            <li key={data.id}>
              <div id={data.status ? "item" : ""}>{data.list}</div>
              <span className="action-icons fixed-position">

                {/* delete */}
                <MdDelete
                  onClick={() => onDelete(data.id)}
                   className="icon delete-icon"
                   title="Delete"
                />

                 {/* edit */}
                 <CiEdit
                    onClick={() => onEdit(data.id)}
                  className="icon edit-icon"
                  title="Edit"
                />

                 {/* complete */}
                 <IoMdDoneAll
                  onClick={() => onComplite(data.id)}
                  className="icon complete-icon"
                  title="Mark as Complete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
 }
// }
export default App;



