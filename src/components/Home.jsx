import React, { useState, useEffect } from "react";
import { doSignOut, getFormData } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"
import { calculateCaloricNeeds } from "../utils/calories";

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [caloriesPerDay, setCaloriesPerDay] = useState(null);

    useEffect(() => {
        const user= auth.currentUser;
        if (user) {
            setUserID(user.uid);
        }
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        if (userID) {
          const formData = await getFormData(userID);
          if (formData) {
            const calories = calculateCaloricNeeds(formData.weight, formData.heightIn, formData.heightFt, formData.age, formData.sex, formData.activity, formData.goal);
            setCaloriesPerDay(calories);
            console.log(calories);
          }
        }
      };
      fetchData();
    }, [userID]);


  const handleSignOut = async () => {
    await doSignOut();
    navigate("/", { replace: true });
  };

  if (!userLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Welcome, {currentUser.email}</h1>
      {<p>Daily caloric need: {caloriesPerDay}</p>}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
