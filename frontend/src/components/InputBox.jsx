export const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div className="">
      <div htmlFor="" className="font-medium text-sm text-left py-1">
        {label}
      </div>
      <input
        className="border rounded p-2 h-[33px] w-72"
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
