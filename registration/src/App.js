import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [formValues, setFormValues] = useState({ lastname: "", firstname:"", address:"", email: "", dateofbirth:"" , phonenumber:""});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const[users, setUsers]=useState([]) //backend data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });   //storing values to array 
  };

  const handleSubmit = (e) => {
    e.preventDefault();                       //stops page from reloading
    setFormErrors(validate(formValues));   // calls validate functions and finds the errors
    setIsSubmit(true);                   //once no errors the form will be submited
  };

  useEffect(() => {
    console.log(formErrors);


    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch('http://localhost:3000/users', {
        method: 'POST',                                   //sending form values to backend 
        body: JSON.stringify({id:"",...formValues}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {console.log(json);
           window.location.reload();})
    }

    fetch('http://localhost:3000/users')
    .then(response => response.json()) //data is getting fetched from backend to frontend
   .then(json => setUsers(json))

  }, [formErrors]);

  console.log(formValues)

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phonenumber_regex = /^[^\s@]{10}$/i ;

    if (!values.lastname) {
      errors.lastname = "lastname is required!";
    }
    
    if (!values.firstname) {
      errors.firstname = "firstname is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.dateofbirth) {
      errors.dateofbirth = "please select date of birth";
    }

    if (!values.phonenumber) {
      errors.phonenumber = "Please enter the phone number";
    }
    else if (!phonenumber_regex.test(values.phonenumber)) {
      errors.phonenumber = "This is not a valid number";
    }
    
    if (!values.address) {
      errors.address = "Enter the address";
    }
    

    return errors;
  };

  return (
    <>
    <div className="container">

      {isSubmit &&(
        <h2 className="ui message success">Registered successfully</h2>  //to display message when form is submitted 
      ) }

      <form onSubmit={handleSubmit}>
        <h1>Registration form</h1>
        <div className="ui divider"></div>
        <div className="ui form">

          <div className="field">
            <label>First Name     </label>
            <input
              type="text"
              name="firstname"
              placeholder="first name"
              value={formValues.firstname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.firstname}</p>

          <div className="field">
            <label>Last Name </label>
            <input
              type="text"
              name="lastname"
              placeholder="last name"
              value={formValues.lastname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.lastname}</p>


          <div className="field">
            <label>Email   </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
         
          <div className="field">
            <label>Date of Birth   </label>
            <input
              type="date"
              name="dateofbirth"
              value={formValues.dateofbirth}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.dateofbirth}</p>

          <div className="field">
            <label>Phone number </label>
            <input
              type="text"
              name="phonenumber"
              placeholder="10 digit number"
              value={formValues.phonenumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phonenumber}</p>

          <div className="field">
            <label>Address </label>
            <textarea
              type="text"
              name="address"
              placeholder="enter a valid address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.address}</p>

          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>



<div className="table_container">
<h2>Registered Users</h2>
<div className="table_body">
  <table border="1">
    <thead>
      <th>
        <span
        >
          First Name
        </span>
      </th>
      <th>
        <span
        >
          Last Name
        </span>
      </th>
      <th>
        <span
        >
          Email
        </span>
      </th>
      <th>
        <span
        >
          Phone Number
        </span>
      </th>
      <th>
        <span
        >
          Date of Birth
        </span>
      </th>
      <th>
        <span
        >
          Address
        </span>
      </th>
    </thead>
    {users.map((users, index) => (
          <tr key={index}>
            <td>
              <span>{users.firstname}</span>
            </td>
            <td>
              <span>{users.lastname}</span>
            </td>
            <td>
              <span>{users.email}</span>
            </td>
            <td>
              <span>{users.phonenumber}</span>
            </td>
            <td>
              <span>{users.dateofbirth}</span>
            </td>
            <td>
              <span>{users.address}</span>
            </td>
            <td>
              <span
                className="delete"
                onClick={()=>{fetch(`http://localhost:3000/users/${users.id}`, {
                  method: 'DELETE',
                }).then(()=>window.location.reload());}}
              >
                Delete User
              </span>
            </td>
          </tr>
        ))}
  </table>
</div>
</div>
</>
);
};
 
export default App