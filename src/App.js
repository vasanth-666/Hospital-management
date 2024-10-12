import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css'; 

function App() {
  const [name, setName] = useState('');
  const [fathername, setFathername] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [datas, setDatas] = useState([]);
  const [newname, setNewname] = useState('');
  const [newmobile, setNewmobile] = useState('');
  const [newlocation, setNewlocation] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get('http://localhost:8081/read')
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const myData = () => {
    Axios.post('http://localhost:8081/insert', {
      Name: name,
      Fathername: fathername,
      Mobile: mobile,
      Location: location,
    })
      .then(() => {
       
        setName('');
        setFathername('');
        setMobile('');
        setLocation('');
        fetchData(); 
      })
      .catch((err) => {
        console.error("Error inserting data:", err);
      });
  };

  const update = (id) => {
    Axios.put('http://localhost:8081/update', {
      id: id,
      newname: newname,
      newmobile: newmobile,
      newlocation: newlocation,
    })
      .then(() => {
      
        setNewname('');
        setNewmobile('');
        setNewlocation('');
        fetchData(); 
      })
      .catch((err) => {
        console.error("Error updating data:", err);
      });
  };

  const deleteData = (id) => {
    Axios.delete(`http://localhost:8081/delete/${id}`)
      .then(() => {
        fetchData(); 
      })
      .catch((err) => {
        console.error("Error deleting data:", err);
      });
  };

  return (
    <div className='App'>
      <h1><marquee>Ganesh Hospital-Salem</marquee></h1>
      <hr />
      <h1>Register</h1>
      <div className='input-container'>
        <input type='text' placeholder='Enter the Name' value={name} onChange={(event) => { setName(event.target.value) }} />
        <input type='text' placeholder='Enter the Fathername' value={fathername} onChange={(event) => { setFathername(event.target.value) }} />
        <input type='number' placeholder='Enter the number' value={mobile} onChange={(event) => { setMobile(event.target.value) }} />
        <input type='text' placeholder='Enter the location' value={location} onChange={(event) => { setLocation(event.target.value) }} />
      </div>
      <button className='btn' onClick={myData}>Register</button>
      <hr />
      <h1>List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fathername</th>
            <th>Mobile</th>
            <th>Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((val) => {
            return (
              <tr key={val._id}>
                <td>{val.Name}</td>
                <td>{val.Fathername}</td>
                <td>{val.Mobile}</td>
                <td>{val.Location}</td>
                <td>
                  <input type='text' placeholder='New Name' value={newname} onChange={(event) => { setNewname(event.target.value) }} />
                </td>
                <td>
                  <input type='number' placeholder='New Mobile' value={newmobile} onChange={(event) => { setNewmobile(event.target.value) }} />
                </td>
                <td>
                  <input type='text' placeholder='New Location' value={newlocation} onChange={(event) => { setNewlocation(event.target.value) }} />
                </td>
                <td>
                  <button onClick={() => update(val._id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => deleteData(val._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
