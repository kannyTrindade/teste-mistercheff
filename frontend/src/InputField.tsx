const InputField = ({ label, name }) => (
    <div className="formField">
        <label htmlFor={name}>{label}*</label>
        <input 
        type="text" 
        name={name}
        />
    </div>
);

export default InputField;