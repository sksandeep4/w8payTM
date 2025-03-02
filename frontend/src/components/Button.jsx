export const Button = ({ label, onClick }) => {
  return (
    <div className="my-2">
      <button
        onClick={onClick}
        className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-white w-70 py-2 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        {label}
      </button>
    </div>
  );
};
