import { LuUsers } from "react-icons/lu";

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-emerald-900 text-gray-300 p-4 rounded-lg relative overflow-hidden">
        <h2 className="text-sm font-medium text-emerald-300">Total Users</h2>
        <p className="text-2xl font-bold">0</p>
        <LuUsers className="text-8xl text-emerald-800 absolute top-0 -right-3" />
      </div>
      <div className="bg-emerald-900 text-gray-300 p-4 rounded-lg relative overflow-hidden">
        <h2 className="text-sm font-medium text-emerald-300">Total Users</h2>
        <p className="text-2xl font-bold">0</p>
        <LuUsers className="text-8xl text-emerald-800 absolute top-0 -right-3" />
      </div>
      <div className="bg-emerald-900 text-gray-300 p-4 rounded-lg relative overflow-hidden">
        <h2 className="text-sm font-medium text-emerald-300">Total Users</h2>
        <p className="text-2xl font-bold">0</p>
        <LuUsers className="text-8xl text-emerald-800 absolute top-0 -right-3" />
      </div>
      <div className="bg-emerald-900 text-gray-300 p-4 rounded-lg relative overflow-hidden">
        <h2 className="text-sm font-medium text-emerald-300">Total Users</h2>
        <p className="text-2xl font-bold">0</p>
        <LuUsers className="text-8xl text-emerald-800 absolute top-0 -right-3" />
      </div>
    </div>
  );
};

export default Analytics;
