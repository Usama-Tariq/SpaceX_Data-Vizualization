import React from 'react';

function DropDown({ name, value, handleChange, items }) {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
    >
      {items.map(item => (
        <option
          key={item}
          value={item}
        >
          {item}
        </option>
      ))}
    </select>
  )
}

export default DropDown;
