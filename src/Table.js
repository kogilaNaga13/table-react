import React from "react"
import { useState } from "react"

function Table(){

    const list=[
        {
            id:1,
            name:"charu",
            age:21
        },
        {
            id:2,
            name:"mathi",
            age:20,
        },
    ]

    const [lists,setList]=useState(list)
    const [edit,setEdit]=useState(-1);

    return(
        <div className="App">
            <AddList setList={setList}/>
            <form onSubmit={handleUpdate}>


            <table>
                {
                    lists.map((current)=>(
                        edit===current.id? <Edit current={current} lists={lists} setList={setList} />:
                        <tr>
                            <td>{current.id}</td>
                            <td>{current.name}</td>
                            <td>{current.age}</td>
                            <td>
                                <button className="edit" onClick={()=>handleEdit(current.id)}>Edit</button>
                                <button className="delete" onClick={()=>handleDelete(current.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            </form>
        </div>
    )

    function handleUpdate(e){
        e.preventDefault()
        setEdit()
    }

    function handleEdit(id){
        setEdit(id)
    }

    function handleDelete(id){
        const newList=lists.filter((li)=>li.id !=id)
        setList(newList)
        console.log(id)

    }

}

function Edit({current,lists,setList}){
    function handleInput(e){
        const newList=lists.map(li=>(
            li.id=== current.id ? {...li,[e.target.name] : e.target.value} :li
           
        ))
        setList(newList)
    }
    
return(
    <tr>
        <td>{current.id}</td>
        <td><input type="text" name="name" onChange={handleInput} value={current.name} /></td>
        <td><input type="text" name="age" onChange={handleInput} value={current.age} /></td>
        <td><button type="submit">Update</button></td>
    </tr>
)
}


function AddList({setList}){

    function handleSubmit(event){

        function random(){
            return(
               parseInt( Math.random()*100000)
            )
        }

        event.preventDefault();
        const name=event.target.elements.name.value;
        const age=event.target.elements.age.value;
        const newList={
            id:random(),
            name,
            age
        }
        setList((prevList)=>{
            return prevList.concat(newList)
        })
    }
    return(
        <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Your name" />
            <input type="text" name="age" placeholder="Enter Your age" />
            <button type="submit">Add</button>
        </form>
    )

}


export default Table;