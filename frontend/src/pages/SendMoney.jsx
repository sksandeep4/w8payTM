import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  if (!id || !name) {
    return <div>Error: Missing parameters in URL</div>;
  }
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="flex flex-col h-full justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1 5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-3xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2 my-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opaque"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="flex h-10 mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter Amount"
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-white w-70 py-2 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => {
                    axios.post(
                      "http://localhost:8080/api/v1/account/transfer",
                      { to: id, amount },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                  }}
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
