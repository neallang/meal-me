import React, {useState} from "react"
import InformationForm from "./InformationForm";

const Form = () => {
    const  [form1Data, setForm1Data] = useState({
        firstName: '',
        emailAddress: '',
        age: 0,
        heightFt: 0,
        heightIn: 0,
        weight: 0,
        sex: '',
    });

    return (
        <div>
            <InformationForm formData={form1Data} setFormData={setForm1Data}></InformationForm>
        </div>
    )
}
export default Form;