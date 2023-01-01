import { useState } from "react";

function useForm({ initialValues, onSubmit, validate }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrors({ ...errors, [name]: null });
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const currErr = validate(values);
        setErrors(currErr);
        if (Object.keys(currErr).length === 0) {
            setSubmitting(true);
            onSubmit(values);
            setSubmitting(false);
        }
    };

    return {
        values,
        errors,
        submitting,
        handleChange,
        handleSubmit,
    };
}

export default useForm;
