import {useState,useEffect } from "react";
import './home.css';
import peopleArr from "./people";
import AddPeople from "./addPeople";
import GetAllPeople from "./getAllPeople.js"
import $ from 'jquery'

export default function Home() {
    const {data} = GetAllPeople();
    const [people,setPeople] = useState([])
    const [clearFlag,setClearFlag] = useState(false)
    const [addPeopleFlag,setAddPeopleFlag] = useState(false)

    useEffect(() => {
        if (data !== undefined) {
            setPeople(data);
        }
    }, [data]);
    //clears all the people shown 
    const handleClearAll = () => {
        console.log("clear")
        setPeople([])
        setClearFlag(true)
    }
    //close one people card
    const handleClear = (index) => {
        const updatedArr = [...people] 
        updatedArr.splice(index,1)
        setPeople(updatedArr)
        if(updatedArr.length == 0) {
            setClearFlag(true)
        }
    }
    //to open add people alert
    const handleAdd = () => {
        console.log("people to be added")
        setAddPeopleFlag(true);
        
    }
    //close the add people form alert
    const handleCloseAlert = () => {
        setAddPeopleFlag(false)
    }

    return (
        <>
        {clearFlag ? "" : <h4 style = {{"textAlign" : "center"}}>{people.length} people have Birthday Today</h4>}<br/>
        <div className = "body  d-flex ">    
            <div>
                {people == undefined ? "Loading" : people.map((people,index) => {
                    return (
                        <div className="card mb-3" style={{"width" : "500px","backgroundColor":"lavenderblush"}} key = {index}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={people.image}  alt="..."/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body" style = {{"textAlign" : "justify"}}>
                        <p id = "title"><h5 className="card-title  mb-0">{people.name.charAt(0).toUpperCase() + people.name.slice(1)}</h5>
                        <span title = "close" onClick={() => handleClear(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg"  
                        width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        </span>
                        </p>
                        <div className = "footerDiv">
                        <p className="card-text age"><small className="text-body-secondary">{people.age} years</small></p>
                        <p className="text-body-secondary">{people.mobilenumber}
                        <button type="button"  className="btn btn-outline-success btn-xs sendWishButton">send wishes</button></p>
                        </div>
                        
                        </div>
                        </div>
                    </div>
                    </div>
                    )
                })}
                {}
               {people.length !== 0 ?
               <>
               <button type = "button" className = "btn btn-md btn-success">send wishes to all</button> {" "}
               <button type="button" className="btn btn-info btn-md" onClick = {handleClearAll}>Clear All</button></> 
               : <><br/></> } 
               {"     "}<button type = "button" className="btn btn-info btn-md" onClick = {handleAdd}> Add People</button>
               {addPeopleFlag ? <AddPeople sendCloseAlert = {handleCloseAlert}/> : ""}
        </div>
        </div>
        </>
    )
}