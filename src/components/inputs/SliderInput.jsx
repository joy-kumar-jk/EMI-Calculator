import { useState } from 'react';

export default function SliderInput({ label, value, min, max, step, unit, onChange, formatDisplay }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const percent = ((value - min) / (max - min)) * 100;

  const formattedValue = formatDisplay
    ? value.toLocaleString('en-IN')
    : value;

  const handleTextFocus = () => {
    setIsEditing(true);
    setEditText(String(value));
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    const v = parseFloat(editText.replace(/,/g, ''));
    if (!isNaN(v) && v >= min && v <= max) onChange(v);
  };

  const handleTextChange = (e) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-1">
          {formatDisplay ? (
            <input
              type="text"
              inputMode="numeric"
              value={isEditing ? editText : formattedValue}
              onFocus={handleTextFocus}
              onBlur={handleTextBlur}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              className="w-28 text-right text-sm font-semibold text-gray-900 border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <input
              type="number"
              value={value}
              min={min}
              max={max}
              step={step}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (!isNaN(v) && v >= min && v <= max) onChange(v);
              }}
              className="w-28 text-right text-sm font-semibold text-gray-900 border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
          {unit && <span className="text-xs text-gray-500">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-600"
        style={{
          background: `linear-gradient(to right, #7c3aed ${percent}%, #e5e7eb ${percent}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{formatDisplay ? formatDisplay(min) : min}</span>
        <span>{formatDisplay ? formatDisplay(max) : max}</span>
      </div>
    </div>
  );
}
