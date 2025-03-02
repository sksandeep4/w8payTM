import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg w-80 bg-white p-2 h-max px-4 flex flex-col items-center text-center">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"Please Enter First Name"}
          />
          <InputBox
            label={"Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"Please Enter Last Name"}
          />
          <InputBox
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder={"Please Enter Email"}
          />
          <InputBox
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"Please Enter Password"}
          />
          <div className="mt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:8080/api/v1/user/signup",
                  {
                    username,
                    password,
                    firstName,
                    lastName,
                  }
                );
                localStorage.setItem("token", response.data.token);
              }}
              label={"Sign Up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
