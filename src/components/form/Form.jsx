import React, {useEffect, useState} from "react"
import InformationForm from "./InformationForm";
import ActivityForm from "./ActivityForm"
import GoalForm from "./GoalForm";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { getFormData } from "../../firebase/auth";

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
        const fetchUserData = async () => {
            const user= auth.currentUser;
            if (user) {
                setUserID(user.uid);
                const data = await getFormData(user.uid);
                if (data) {
                    setFormData({
                        firstName: data.firstName || '',
                        age: data.age || 0,
                        heightFt: data.heightFt || 0,
                        heightIn: data.heightIn || 0,
                        weight: data.weight || 0,
                        sex: data.sex || '',
                        activity: data.activity || '',
                        goal: data.goal || '',
                    })
                }
            }
    }
    fetchUserData();
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