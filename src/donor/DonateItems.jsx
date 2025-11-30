import { useState, useEffect } from "react";

// ⭐ Firestore Imports
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

function DonateItems() {
  const [form, setForm] = useState({
    category: "",
    item: "",
    quantity: "",   // ⭐ Now TEXT
    condition: "",
    houseNo: "",
    street: "",
  });

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");

  const [donations, setDonations] = useState([]);
  const [editId, setEditId] = useState(null);

  // ⭐ REAL-TIME Firestore Listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "donations"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(list);
    });

    return () => unsub();
  }, []);

  // ⭐ Fetch city + state from pincode
  const fetchLocationFromPincode = async (pincode) => {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const office = data[0].PostOffice[0];
        return {
          city: office.District,
          state: office.State,
        };
      } else {
        return null;
      }
    } catch {
      return null;
    }
  };

  const handlePincodeChange = async (e) => {
    const pin = e.target.value;
    setPincode(pin);

    if (pin.length === 6) {
      const location = await fetchLocationFromPincode(pin);
      if (location) {
        setCity(location.city);
        setStateVal(location.state);
      } else {
        alert("Invalid pincode!");
        setCity("");
        setStateVal("");
      }
    }
  };

  // ⭐ Handle Form Inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⭐ Add or Update Donation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.category ||
      !form.item ||
      !form.quantity ||
      !form.condition ||
      !form.houseNo ||
      !form.street ||
      !pincode ||
      !city ||
      !stateVal
    ) {
      alert("All fields including full address are required!");
      return;
    }

    const donationData = {
      ...form,
      pincode,
      city,
      state: stateVal,
    };

    try {
      if (editId) {
        await updateDoc(doc(db, "donations", editId), donationData);
        alert("Donation updated!");
        setEditId(null);
      } else {
        await addDoc(collection(db, "donations"), donationData);
        alert("Donation added!");
      }
    } catch (err) {
      console.log(err);
      alert("Error saving to Firestore");
    }

    // Reset form
    setForm({
      category: "",
      item: "",
      quantity: "",
      condition: "",
      houseNo: "",
      street: "",
    });
    setPincode("");
    setCity("");
    setStateVal("");
  };

  // ⭐ Edit Donation
  const handleEdit = (d) => {
    setForm({
      category: d.category,
      item: d.item,
      quantity: d.quantity,
      condition: d.condition,
      houseNo: d.houseNo,
      street: d.street,
    });
    setPincode(d.pincode);
    setCity(d.city);
    setStateVal(d.state);
    setEditId(d.id);
  };

  // ⭐ Delete Donation
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "donations", id));
    alert("Donation deleted");
  };

  return (
    <div className="container mt-4">
      <h2>Donate Items</h2>

      <div className="card p-3 mt-3 shadow">
        <form onSubmit={handleSubmit}>
          {/* Category */}
          <div className="mb-2">
            <label>Category:</label>
            <select
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Medicines">Medicines</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Item */}
          <div className="mb-2">
            <label>Item Name:</label>
            <input
              type="text"
              name="item"
              className="form-control"
              value={form.item}
              onChange={handleChange}
            />
          </div>

          {/* ⭐ Quantity (TEXT) */}
          <div className="mb-2">
            <label>Quantity (Ex: 5kg, 3 packets)</label>
            <input
              type="text"
              name="quantity"
              className="form-control"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Ex: 5kg, 3 packets"
            />
          </div>

          {/* Condition */}
          <div className="mb-2">
            <label>Condition:</label>
            <select
              name="condition"
              className="form-select"
              value={form.condition}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Used - Good">Used - Good</option>
            </select>
          </div>

          {/* Address Fields */}
          <h5 className="mt-3">Pickup Address</h5>

          <div className="mb-2">
            <label>House No:</label>
            <input
              type="text"
              name="houseNo"
              className="form-control"
              value={form.houseNo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label>Street:</label>
            <input
              type="text"
              name="street"
              className="form-control"
              value={form.street}
              onChange={handleChange}
            />
          </div>

          {/* Pincode */}
          <div className="mb-2">
            <label>Pincode:</label>
            <input
              type="number"
              className="form-control"
              value={pincode}
              onChange={handlePincodeChange}
            />
          </div>

          {/* City */}
          <div className="mb-2">
            <label>City:</label>
            <input type="text" className="form-control" value={city} disabled />
          </div>

          {/* State */}
          <div className="mb-2">
            <label>State:</label>
            <input type="text" className="form-control" value={stateVal} disabled />
          </div>

          <button className="btn btn-primary w-100 mt-2">
            {editId ? "Update Donation" : "Add Donation"}
          </button>
        </form>
      </div>

      {/* Donation List */}
      <div className="mt-4">
        <h3>Your Donations</h3>
        {donations.length === 0 ? (
          <p>No donations added yet.</p>
        ) : (
          <ul className="list-group">
            {donations.map((d) => (
              <li
                key={d.id}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <b>{d.item}</b> ({d.category}) – {d.quantity}
                  <br />
                  <small>
                    {d.houseNo}, {d.street}, {d.city}, {d.state} ({d.pincode})
                  </small>
                </div>

                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DonateItems;
