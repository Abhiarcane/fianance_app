import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

const Credit = ({ user }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  async function addData(e) {
    setLoading(true);
    e.preventDefault();
    if (name && amount && desc) {
      try {
        const expenseRef = collection(db, `Users/${user.uid}/Credits`);
        await addDoc(expenseRef, {
          name: name,
          amount: parseFloat(amount),
          description: desc,
          timestamp: new Date(),
        });
        toast.success("Credit added");
        setLoading(false);
        // Clear input fields
        setName("");
        setAmount("");
        setDesc("");
      } catch (error) {
        console.error("Error adding credit: ", error);
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all fields.");
      setLoading(false);
    }
  }

  return (
    <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Add Credit</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold p-2 rounded-lg hover:bg-green-600 transition duration-200"
          onClick={addData}
        >
          {loading ? "loading" : "Add Credit"}
        </button>
      </form>
    </div>
  );
};

export default Credit;
