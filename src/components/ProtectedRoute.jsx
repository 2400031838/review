import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({ allowedRoles, children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

      // ❌ Not logged in → redirect to login
      if (!loggedUser || !loggedUser.id) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      // 🔥 Get user from Firestore
      const userRef = doc(db, "users", loggedUser.id);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const userData = snap.data();

        // Check role
        if (allowedRoles.includes(userData.role)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } else {
        setAuthorized(false);
      }

      setLoading(false);
    };

    checkUser();
  }, [allowedRoles]);

  if (loading) return <p className="text-center mt-5">Checking Access...</p>;

  // ❌ If not allowed → redirect to login
  if (!authorized) return <Navigate to="/login" replace />;

  // ✔ Allowed → open component
  return children;
}
