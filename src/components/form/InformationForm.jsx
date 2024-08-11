import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const InformationForm = ({ formData, setFormData }) => {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/form/part2")
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Enter Personal Information Here</h2>

            <label htmlFor="firstName">First Name</label>
            <input 
                id="firstName"
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
            />

            <label htmlFor="age">Age</label>
            <input 
                id="age"
                type="number"
                name="age"
                placeholder="25"
                value={formData.age}
                onChange={handleChange}
                required
            />
            <label htmlFor="age">years</label>

            <label htmlFor="heightFt">Height</label>
            <input 
                id="heightFt"
                type="number"
                name="heightFt"
                placeholder="5"
                value={formData.heightFt}
                onChange={handleChange}
                required
            />
            <label htmlFor="heightFt">ft.</label>

            <input 
                id="heightIn"
                type="number"
                name="heightIn"
                placeholder="7"
                value={formData.heightIn}
                onChange={handleChange}
                required
            />
            <label htmlFor="heightIn">in.</label>

            <label htmlFor="weight">Weight</label>
            <input 
                id="weight"
                type="number"
                name="weight"
                placeholder="165"
                value={formData.weight}
                onChange={handleChange}
                required
            />
            <label htmlFor="weight">lbs.</label>

            <div>
                <label>Sex:</label>
                <label>
                    <input 
                    type="radio" 
                    name="sex" 
                    value="male" 
                    checked={formData.sex === 'male'} 
                    onChange={handleChange} 
                    required 
                    />
                    Male
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="sex" 
                    value="female" 
                    checked={formData.sex === 'female'} 
                    onChange={handleChange} 
                    required 
                    />
                    Female
                </label>
                <label>
                    <input 
                    type="radio" 
                    name="sex" 
                    value="other" 
                    checked={formData.sex === 'other'} 
                    onChange={handleChange} 
                    required 
                    />
                    Other
                </label>
            </div>
            <button type="submit">Next</button>

        </form>
    )
};

export default InformationForm;