export default function TenureToggle({ value, onChange }) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-0.5 w-fit">
      {['months', 'years'].map((unit) => (
        <button
          key={unit}
          onClick={() => onChange(unit)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            value === unit
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {unit.charAt(0).toUpperCase() + unit.slice(1)}
        </button>
      ))}
    </div>
  );
}
