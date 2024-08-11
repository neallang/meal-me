import React, { useState } from "react"

const InformationForm = ({ formData, setFormData }) => {

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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

            <label htmlFor="emailAddress">Email Address</label>
            <input 
                id="emailAddress"
                type="text"
                name="emailAddress"
                placeholder="john@example.com"
                value={formData.emailAddress}
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
                <label htmlFor="sex">Sex</label>
                <select 
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button type="submit">Next</button>

        </form>
    )
};

export default InformationForm;