import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import './forms.css'

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
            <h2>Who Are You?</h2>
            <p>Help us tailor recipes toward your goals by entering some personal information.</p>


            <div className="form-content">
                <div className="form-el">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName"
                        className="input-el"
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-el">
                    <label htmlFor="age">Age</label>
                    <input 
                        id="age"
                        className="input-el"
                        type="number"
                        name="age"
                        placeholder="25"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="age">years</label>
                </div>

                <div className="form-el">                
                    <label htmlFor="heightFt">Height</label>
                    <div className="form-height">
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
                    </div>
                    <label htmlFor="heightIn">in.</label>
                </div>

                <div className="form-el">
                    <label htmlFor="weight">Weight</label>
                    <input 
                        id="weight"
                        className="input-el"
                        type="number"
                        name="weight"
                        placeholder="165"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="weight">lbs.</label>
                </div>

                <div className="form-sex">
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
            </div>

        </form>
    )
};

export default InformationForm;