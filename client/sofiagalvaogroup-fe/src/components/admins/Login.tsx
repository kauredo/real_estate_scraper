import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/getters";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      console.log(response);

      // if (response.status === 200) {
      //   navigate("/admin/dashboard");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-[450px]"
      >
        <div className="field mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="field mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="field mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="remember_me"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <label
            htmlFor="remember_me"
            className="block text-gray-700 text-sm font-bold"
          >
            Remember me
          </label>
        </div>
        <div className="actions flex items-center justify-between">
          <input
            type="submit"
            value="Log in"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  );
}
