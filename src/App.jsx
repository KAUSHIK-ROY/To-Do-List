import './App.css';
import { useState } from "react";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {
    const [save, setSave] = useState([]);

  let submitData =(event)=>{
    event.preventDefault();

    let todoname = event.target.todoname.value;
    if(!save.includes(todoname)){
      let finalList = [...save,todoname] 
      setSave(finalList);
      NotificationManager.success('Successfully Added');
    }
    else{
      NotificationManager.error('Already Exists');
    }
  }
  let list =save.map((value, index)=>{
    return(
      <Items value={value} key={index} inumber={index} save={save} setSave={setSave}/>      //function bellow   //use parent props
    )
  })
  return (
    <div className="App">
      <div className= "container">
        <div className="title">
          <h1>To Do List</h1>
        </div>
        <form className="add" onSubmit={submitData}>
        <NotificationContainer/>
          <input type="text" name='todoname' placeholder="Enter your Work"/>
          <button>Add Work</button>
        </form>
        <div className='full-result'>
          <div className='result'>
            <ul> 
                {list}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function Items({value, inumber, save, setSave}){                      //child props
  
  
  let[status,setStatus] = useState(false);
  let dltRow= () =>{
    let finalData = save.filter((v,i)=> i !==inumber );
    setSave(finalData)
    // Reset the status of the following item (if it exists)
      setStatus(false);
  }

  
  let checkStatus=()=>{
    setStatus(!status);  
  }
  return( 
        <div className='work'>
            <li className={status ? "completeList" : ''}>          {/* onClick={checkStatus} >*/}
              <input className ="click" type='checkbox' checked={status}  onClick={checkStatus}/>         
            <span>{inumber+1}. {value}</span>
             
            </li>
            <button onClick={dltRow}>&times;</button>
            
        </div>
  )
}




//this is time

