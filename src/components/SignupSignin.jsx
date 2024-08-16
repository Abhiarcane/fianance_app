import { React, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  async function addData(user) {
    try {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "Users", user.uid), {
          name: name,
          email: user.email,
          user_id: user.uid,
        });
        toast.success("Data added");
      } else {
        toast.error("Data already exists");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function signUpEmail() {
    setLoading(true);

    if (name !== "" && email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          toast.success("User created successfully!");
          setLoading(false);
          navigate("/dashboard");
          // Clear input fields

          addData(user);

          setName("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("Please fill in all the fields.");
      setLoading(false);
    }
  }

  function signInEmail() {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("login successful");

          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("Fill all the fields");
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center">
      {login ? (
        <div className="w-1/4 shadow-lg p-8 bg-white rounded-lg">
          <span className="text-2xl font-bold mb-2 block">
            Welcome to <span className="text-blue-500">Finbetter</span>
          </span>
          <p className="mb-6 text-sm">An easy way to manage your finance.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={signInEmail}
            >
              {loading ? "loading" : "Sign In"}
            </button>

            <div className="flex items-center justify-center my-4">
              <span className="border-t border-gray-300 flex-grow mr-3"></span>
              <span className="text-sm text-gray-500">or</span>
              <span className="border-t border-gray-300 flex-grow ml-3"></span>
            </div>
            <button
              type="button"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {loading ? "loading" : "Sign In with Google"}
            </button>
            <p className="text-black text-sm">
              Don't have an account?
              <span
                className="text-blue-500 ml-2 cursor-pointer"
                onClick={(e) => setLogin(!login)}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-1/4 shadow-lg p-8 bg-white rounded-lg">
          <span className="text-2xl font-bold mb-2 block">
            Welcome to <span className="text-blue-500">Finbetter</span>
          </span>
          <p className="mb-6 text-sm">An easy way to manage your finance.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={signUpEmail}
            >
              {loading ? "loading" : "Sign Up"}
            </button>

            <div className="flex items-center justify-center my-4">
              <span className="border-t border-gray-300 flex-grow mr-3"></span>
              <span className="text-sm text-gray-500">or</span>
              <span className="border-t border-gray-300 flex-grow ml-3"></span>
            </div>
            <button
              type="button"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {loading ? "loading" : "Sign up with Google"}
            </button>
            <p className="text-black text-sm">
              Already have an account?
              <span
                className="text-blue-500 ml-2 cursor-pointer"
                onClick={(e) => setLogin(!login)}
              >
                Login in
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupSignin;
