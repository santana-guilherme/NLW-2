import React, { InputHTMLAttributes, useState } from 'react';

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputPassword: React.FC<InputProps> = ({ id, label, name, ...rest}) =>  {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="input-block password-block" id={id}>
      <label htmlFor={ name }>{ label }</label>
      <input type={`${showPassword?'text':'password'}`} id={ name } { ...rest } />
      <span onClick={() => setShowPassword(!showPassword)}>
        <div className={`eye ${showPassword?'eye-slash':''}`}></div>
      </span>
    </div>
  );
}

export default InputPassword;