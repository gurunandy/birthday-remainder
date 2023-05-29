import {useEffect,useState} from "react";
import $ from "jquery";

export default function GetAllPeople() {
    const [data,setData] = useState();

    useEffect(() => {
        $.ajax({
            url : '/people/getPeople',
            method : 'GET',
            success : function(result) {
                setData(result);
            },
            error : function(err) {
                console.log("error in getting people from db")
            }
        })
    },[])
    return {data};
}