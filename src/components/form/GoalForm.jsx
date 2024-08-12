import React from "react"
import { useNavigate } from "react-router-dom"
import { saveFormData } from "../../firebase/auth";
import './goal-form.css'

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
        <form id="goal-form" onSubmit={handleSubmit}>
            <h1>What Are Your Goals?</h1>
            <p>Where do you want to be in 6 months? What are your long-term health goals?</p>
            <div className="form-content">
                <div className="form-el">
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
                    <div className="description">
                        <p>~1 lb/week</p>
                    </div>
                </div>
                <div className="form-el">
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
                    <div className="description">
                        <p>~0.5 lb/week</p>
                    </div>
                </div>
                <div className="form-el">
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
                    <div className="description">
                        <p>0 lb/week</p>
                    </div>
                </div>
                <div className="form-el">
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
                    <div className="description">
                        <p>~0.5 lb/week</p>
                    </div>
                </div>
                <div className="form-el">
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
                    <div className="description">
                        <p>~1 lb/week</p>
                    </div>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default GoalForm;