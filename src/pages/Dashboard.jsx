import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Expense from "../components/Expense";
import Credit from "../components/Credit";
import Transactions from "../components/Transactions";
import { getDocs, collection } from "firebase/firestore";
import Graph from "../components/Graph";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [creditsArray, setCreditsArray] = useState([]);
  const [expensesArray, setExpensesArray] = useState([]);
  const [creditX, setCreditX] = useState([]);
  const [expenseY, setExpenseY] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    async function getAllCredits() {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, `Users/${user.uid}/Credits`)
        );
        const querySnapshot1 = await getDocs(
          collection(db, `Users/${user.uid}/Expenses`)
        );

        const credits = [];
        const expense = [];
        querySnapshot.forEach((doc) => {
          credits.push(doc.data());
        });
        querySnapshot1.forEach((doc) => {
          expense.push(doc.data());
        });

        setCreditsArray(credits);
        setExpensesArray(expense);
        setCreditX(creditsArray.map((item) => item.amount));
        setExpenseY(expensesArray.map((item) => item.amount));
      }
    }

    getAllCredits();
  }, [user, creditsArray, expensesArray]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white shadow-md rounded-lg p-4">
            <div className="text-3xl font-semibold text-green-600">{`$${sum}`}</div>
            <span>Total Credit</span>
          </div>
          {/* Graph Section */}
          <Graph x={creditX} y={expenseY} />

          {/* Add Expense Section */}
          <Expense user={user} />
          {/* Add Credit Section */}
          <Credit user={user} />

          {/* Last Transaction History Section */}
          <Transactions arr={creditsArray} arr1={expensesArray} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
