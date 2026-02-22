import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://crm-backend-b4n1.onrender.com";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const token = localStorage.getItem("token");

  const fetchCustomers = async () => {
    const res = await axios.get(`${API}/api/customers`, {
      headers: { Authorization: ` ${token}` },
    });
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/api/customers`, form, {
      headers: { Authorization: ` ${token}` },
    });
    fetchCustomers();
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`${API}/api/customers/${id}`, {
      headers: { Authorization: ` ${token}` },
    });
    fetchCustomers();
  };

  return (
    <div className="p-6">
     
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      

      <form onSubmit={addCustomer} className="grid grid-cols-4 gap-2 mb-6">
        <input placeholder="Name" className="border p-2" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" className="border p-2" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input placeholder="Phone" className="border p-2" onChange={(e)=>setForm({...form,phone:e.target.value})}/>
        <input placeholder="Company" className="border p-2" onChange={(e)=>setForm({...form,company:e.target.value})}/>
        <button className="bg-blue-500 text-white p-2 rounded col-span-4 cursor-pointer">Add Customer</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id} className="text-center border">
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.company}</td>
              <td>
                <button
                  onClick={() => deleteCustomer(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded  cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br>
        </br>
        <br>
        </br>
      <button className="bg-red-700 text-white p-2 " onClick={()=>{localStorage.removeItem("token");
        navigate("/login");}}>Logout</button>
        
    </div>
  );
}

export default Dashboard;