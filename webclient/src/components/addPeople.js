import {Alert} from 'react-bootstrap';
import {useState,useRef} from 'react';
import './addPeople.css';
import $ from 'jquery'

export default function AddPeople({sendCloseAlert}) {
    const [closeAlert,setCloseAlert] = useState(false);
    // const [name,setName] = useState("");
    // const [dob,setDob] = useState("");
    // const [mobile,setMobile] = useState()
    const [message,setMessage] = useState()
    const [success,setSuccess] = useState(false);
    const peopleName = useRef();
    const date = useRef();
    const phn = useRef();

    const handleCloseAdd = () => {
        setCloseAlert(true)
        sendCloseAlert(closeAlert)
    }
    const handleAddPeople = () => {
        console.log(peopleName.current.value,date.current.value,phn.current.value)
        $.ajax({
            url : '/people/addpeople',
            method : "POST",
            data : {
                name : peopleName.current.value,
                dob : date.current.value,
                mobile : phn.current.value,
                image : ""
            },
            success : function(data) {
                console.log(data);
                peopleName.current.value = "";
                date.current.value = "";
                phn.current.value = "";
                setMessage(<h6 style = {{"color" : "green","padding" : "5px"}}>{data.message}</h6>)
                setSuccess(true)
                const timer = setTimeout(() => {
                    // setMessage("");
                    setSuccess(false)
                  }, 2000)
                  return () => {clearTimeout(timer)}

            },
            error : function(error) {
                console.log("error in adding people",error)
            }
        })
    }
    return (
        <>
            <div className="alert-container">
            <div className="alert">
                <table >
                    <thead>
                        <tr>
                            <th colSpan = "2">
                            Fill the Details
                            </th>
                        </tr>
                    
                    </thead>
                    <tbody>
                    <tr>
                    <td>
                    <span title = "close" onClick = {handleCloseAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg"  
                        width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Enter the name </label>
                        </td>
                        
                        <td>
                        <input type = "text" ref = {peopleName} placeholder='Enter name' />
                    </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Enter the Date of Birth </label>
                        </td>
                    <td>
                        <input type = "date" ref = {date} placeholder='select DOB' style = {{"width" : "100%"}}/>
                    </td>
                    </tr>
                    <tr>
                        <td>
                           <label> Enter Mobile Number</label>
                        </td>
                        <td>
                            <input type="text" ref = {phn} placeholder='please enter number'/>
                        </td>
                    </tr>
                    {/* <tr>
                        <td>
                            <label>Upload Image</label>
                        </td>
                        <td>
                            <input type = "file" accept = " image/*"/>
                        </td>
                    </tr> */}
                    </tbody>
                </table>
                <div>
                <button type = "button" className = "btn btn-info btn-md" onClick = {handleAddPeople}>Add People</button>
               {success ? message : ""} 
                    </div>
            </div>
            </div>
        </>
    )
}