import React, { useEffect, useState } from "react";

// ⭐ Firestore
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Reports() {
  const [donCount, setDonCount] = useState(0);
  const [reqCount, setReqCount] = useState(0);
  const [driveCount, setDriveCount] = useState(0);

  // ⭐ Fetch counts in real-time
  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "donations"), (snapshot) => {
      setDonCount(snapshot.size);
    });

    const unsub2 = onSnapshot(collection(db, "requests"), (snapshot) => {
      setReqCount(snapshot.size);
    });

    const unsub3 = onSnapshot(collection(db, "donationDrives"), (snapshot) => {
      setDriveCount(snapshot.size);
    });

    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, []);

  return (
    <div className="container mt-4">
      <h2>Reports & Analytics</h2>

      <div className="card p-3 mt-3 shadow">
        <h4>Total Donations: {donCount}</h4>
        <h4>Total Requests: {reqCount}</h4>
        <h4>Total Drives: {driveCount}</h4>
      </div>
    </div>
  );
}

export default Reports;
