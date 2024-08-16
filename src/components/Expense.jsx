import React, { useState } from "react";
import { db } from "../firebase"; // Ensure you import your firebase configuration
import { collection, addDoc } from "firebase/firestore";

const Expense = ({ user }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  async function addData(e) {
    setLoading(true);
    e.preventDefault();
    if (name && amount && desc) {
      try {
        const negativeAmount = -parseFloat(amount);
        const expenseRef = collection(db, `Users/${user.uid}/Expenses`);
        await addDoc(expenseRef, {
          name: name,
          amount: negativeAmount,
          description: desc,
          timestamp: new Date(),
        });
        console.log("Expense added successfully");
        setLoading(false);
        // Clear input fields
        setName("");
        setAmount("");
        setDesc("");
      } catch (error) {
        console.error("Error adding expense: ", error);
        setLoading(false);
      }
    } else {
      console.error("Please fill in all fields.");
      setLoading(false);
    }
  }

  return (
    <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Add Expense</h2>
      <form onSubmit={addData}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
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
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {loading ? "loading" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default Expense;
