import React, {useState} from "react"
import InformationForm from "./InformationForm";
import ActivityForm from "./ActivityForm"
import GoalForm from "./GoalForm";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const Form = () => {
    const  [formData, setFormData] = useState({
        firstName: '',
        emailAddress: '',
        age: null,
        heightFt: null,
        heightIn: null,
        weight: null,
        sex: '',
        activity: '',
        goal: '',
    });




    return (
        <Routes>
            <Route path="*" element={<Navigate to="/form/part1" />} />
            <Route path="/part1" element={<InformationForm formData={formData} setFormData={setFormData} />} />
            <Route path="/part2" element={<ActivityForm formData={formData} setFormData={setFormData} />} />
            <Route path="/part3" element={<GoalForm formData={formData} setFormData={setFormData} />} />
        </Routes>
    )
}
export default Form;