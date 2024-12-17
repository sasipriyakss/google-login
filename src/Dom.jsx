import React, { useEffect,useState } from 'react'
import jwt_decode from "jwt-decode";

export default function Dom() {
    const [user,setUser]=useState({});
   function handleCallbackResponse(response){
    console.log("Encoded jwt ID Token:"+ response.credential)
     let userObject = jwt_decode(response.credential);
     console.log(userObject);
     setUser(userObject);
     document.getElementById("signInDiv").hidden=true;
   }

function handelSignOut(event)
{
  setUser({});
  document.getElementById("signInDiv").hidden=false;
}

    useEffect(()=>
    {
        google.accounts.id.initialize({
            client_id:"enter your id",
            callback: handleCallbackResponse
         });
        google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme:"outline", size: "large"}

     );

    },[])

    // if we have no user: sign in button 
    // if we have a user: show the log out button


    
  return (
    <div>

    <div id="signInDiv"></div>

    
     {user && 
     <div> 
      <img src={user.picture} />
      <h3>{user.name}</h3>
      </div>
       
     }

{
  Object.keys(user).length !== 0 &&  <button onClick={(e) => handelSignOut(e)}>SignOut</button>
    }

    
    </div>
  )
}
