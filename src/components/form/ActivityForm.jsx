import React from "react"
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <h1>Describe Your Activity Level</h1>
            <div>
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
            </div>
            <button type="submit">Next</button>
        </form>
    )
}

export default ActivityForm;