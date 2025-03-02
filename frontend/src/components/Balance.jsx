export const Balance = ({ value }) => {
  return (
    <div className="flex my-2 ml-4 items-center">
      <div className="flex flex-col justify-center font-bold text-lg h-full mr-4">
        Your Balance:
      </div>
      <div className="flex flex-col justify-center font-bold text-xl h-full text-xl">
        ${value}
      </div>
    </div>
  );
};
