// components/ToggleSwitch.tsx
import React, { ChangeEvent } from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <label htmlFor="toggle" className="switch">
      <input
        type="checkbox"
        id="toggle"
        checked={isOn}
        onChange={handleToggle}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
