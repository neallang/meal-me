import React from "react"
import { useNavigate } from "react-router-dom";
import './activity-form.css'

const ActivityForm = ({ formData, setFormData }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/form/part3");
    }


    const handleChange = (e) => {
        const value = e.target.value
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    return (
        <form id="activity-form" onSubmit={handleSubmit}>
            <h1>Describe Your Activity Level</h1>
            <p>Select the most applicable choice to your activity level. Just be honest - we don't judge!</p>
            <div className="form-content">
                <div className="form-el">
                    <label>
                        <input 
                        type="radio" 
                        name="activity" 
                        value="inactive" 
                        checked={formData.activity === 'inactive'} 
                        onChange={handleChange} 
                        required 
                        />
                        Inactive
                    </label>
                    <div className="description">
                        <p>Little to no exercise</p>
                        <p>(0-1 times per week)</p>
                    </div>
                </div>
                <div className="form-el">
                    <label>
                        <input 
                        type="radio" 
                        name="activity" 
                        value="mildlyActive" 
                        checked={formData.activity === 'mildlyActive'} 
                        onChange={handleChange} 
                        required 
                        />
                        Mildly Active
                    </label>
                    <div className="description">
                        <p>Light to moderate exercise</p>
                        <p>(2-3 times per week)</p>
                    </div>
                </div>
                <div className="form-el">
                    <label>
                        <input 
                        type="radio" 
                        name="activity" 
                        value="active" 
                        checked={formData.activity === 'active'} 
                        onChange={handleChange} 
                        required 
                        />
                        Active
                    </label>
                    <div className="description">
                        <p>Moderate to intense exercise</p>
                        <p>(4-5 times per week)</p>
                    </div>
                </div>
                <div className="form-el">
                    <label>
                        <input 
                        type="radio" 
                        name="activity" 
                        value="veryActive" 
                        checked={formData.activity === 'veryActive'} 
                        onChange={handleChange} 
                        required 
                        />
                        Very Active
                    </label>
                    <div className="description">
                        <p>Moderate to intense exercise</p>
                        <p>(6-7 times per week)</p>
                    </div>
                </div>
                <div className="form-el">
                    <label>
                        <input 
                        type="radio" 
                        name="activity" 
                        value="extremelyActive" 
                        checked={formData.activity === 'extremelyActive'} 
                        onChange={handleChange} 
                        required 
                        />
                        Extremely Active
                    </label>
                    <div className="description">
                        <p>Intense exercise daily or physical job</p>
                        <p>(7 times per week)</p>
                    </div>
                </div>
            </div>
            <button type="submit">Next</button>
        </form>
    )
}

export default ActivityForm;