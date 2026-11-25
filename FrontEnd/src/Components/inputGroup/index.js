const InputGroup =({
    type, placeholder, name, onChange, label, value, min, step, required
}) =>{
    return (
        <div className="input-group mb-3">
            <span className="input-group-text">{label}</span>
            <input className="form-control"
            type={type}
            value={value}
            min={min}
            step={step}
            required={required}
            placeholder={placeholder} 
            name={name}
            onChange ={onChange }
            />
        </div>
    )
}

export default InputGroup;