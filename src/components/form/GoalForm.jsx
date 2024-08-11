import React from "react"
import { useNavigate } from "react-router-dom"
import { saveFormData } from "../../firebase/auth";

const GoalForm = ({ formData, setFormData, userID }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveFormData(userID, formData)
        navigate('/home');
    }


    const handleChange = (e) => {
        const value = e.target.value
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>What Are Your Goals?</h1>
            <div>
                <label>
                    <input 
                    type="radio" 
                    name="goal" 
                    value="weightLoss" 
                    checked={formData.goal === 'weightLoss'} 
                    onChange={handleChange} 
                    required 
                    />
                    Weight Loss
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="goal" 
                    value="mildWeightLoss" 
                    checked={formData.goal === 'mildWeightLoss'} 
                    onChange={handleChange} 
                    required 
                    />
                    Mild Weight Loss
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="goal" 
                    value="maintainWeight" 
                    checked={formData.goal === 'maintainWeight'} 
                    onChange={handleChange} 
                    required 
                    />
                    Maintain Weight
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="goal" 
                    value="mildWeightGain" 
                    checked={formData.goal === 'mildWeightGain'} 
                    onChange={handleChange} 
                    required 
                    />
                    Mild Weight Gain
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="goal" 
                    value="weightGain" 
                    checked={formData.goal === 'weightGain'} 
                    onChange={handleChange} 
                    required 
                    />
                    Weight Gain
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default GoalForm;