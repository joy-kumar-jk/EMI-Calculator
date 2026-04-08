export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">E</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">EMI Calculator</h1>
          <p className="text-xs text-gray-500">Plan your loan repayment</p>
        </div>
      </div>
    </header>
  );
}
