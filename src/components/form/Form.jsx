import React, {useEffect, useState} from "react"
import InformationForm from "./InformationForm";
import ActivityForm from "./ActivityForm"
import GoalForm from "./GoalForm";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

const Form = () => {
    const  [formData, setFormData] = useState({
        firstName: '',
        age: 0,
        heightFt: 0,
        heightIn: 0,
        weight: 0,
        sex: '',
        activity: '',
        goal: '',
    });

    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const user= auth.currentUser;
        if (user) {
            setUserID(user.uid);
        }
    }, []);



    return (
        <Routes>
            <Route path="*" element={<Navigate to="/form/part1" />} />
            <Route path="/part1" element={<InformationForm formData={formData} setFormData={setFormData} />} />
            <Route path="/part2" element={<ActivityForm formData={formData} setFormData={setFormData} />} />
            <Route path="/part3" element={<GoalForm formData={formData} setFormData={setFormData} userID={userID} />} />
        </Routes>
    )
}
export default Form;