import Features from "../components/Features";
import Hero from "../components/Hero";
import SplitImageContent from "../components/SplitImageContent";
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


function Landing() {
    const [user1, setUser] = useState(null);


    async function fetchAuthDetails() {
        fetch('/.auth/me')
            .then(function (response) {
                return response.json();
            })
            .then(async function (data) {
                if (data.clientPrincipal != null) {
                    console.log(data.clientPrincipal.userId);
                    setUser(data.clientPrincipal.userId)
                    // see if the user is in the database
                    const result1 = await fetch("/api/user/", {
                        method: "get",
                      });
                    const user1 = await result1.json()
                    console.log(user1)
                    
                    //if use isn't in the database, then we add it into database
                    if(user1.user === null){
                        const user_add = await fetch("/api/user", {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify()
                          })
                          if (user_add.ok) {
                            console.log("id: " + await user_add.json());
                          } else {
                            console.log("failed")
                          }
                    }
                }else{
                    console.log(data)
                }
            })
            .catch(function (err) {
                console.error('Error fetching auth details:', err);
            });
    }

    useEffect(() => {
        fetchAuthDetails();
    }, [user1]);

    if (user1 === null) {
        return (
          <div>
            <Hero />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#111827" fillOpacity="1" d="M0,320L48,277.3C96,235,192,149,288,138.7C384,128,480,192,576,181.3C672,171,768,85,864,69.3C960,53,1056,107,1152,112C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
            <Features />
            <SplitImageContent />
          </div>
        );
      } else {
        return <Navigate to="/dashboard1" replace />;
      }
};


export default Landing;