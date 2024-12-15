import { useEffect, useState } from 'react'
// import { decode as jwt_decode } from 'jwt-decode';
import jwt_decode from "jwt-decode";


 // Import the `decode` function
 
function App() {

  const [user, setUser]= useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden=true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden=false;

  }
  useEffect(()=> {
    /* global google */
      google.accounts.id.initialize({
   
      client_id:"662686241550-9a9pun0jijj7cg73uhmomthm7rh1p5c9.apps.googleusercontent.com",
      callback:handleCallbackResponse
      });

    google.accounts.id.renderButton(

      document.getElementById('signInDiv'),
      { theme:"outline", size:"large"}
    )
  //  google.accounts.id.prompt();
    },[]);
// If we have no user: sign in button
//if we have a user: show log out button
  return (
    <>

     <h3>Sign In with your google account</h3>
     <div id="signInDiv"></div>


    
     {user && 
     <div className='display'>
      <img src={user.picture}></img>
      <h3> {user.name}</h3>
     </div>}

     { Object.keys(user).length !=0 &&
 <button onClick={ (e) => handleSignOut(e)}> Sign Out </button>
}
    </>
  )
}

export default App


{/*<img
  src={user.picture || "https://via.placeholder.com/150"}
  alt="Profile"
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/150"; // Default image if the URL fails
  }} */}
