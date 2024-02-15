import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashboardProfile from "../components/DashboardProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div  className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/*sidebar ---- in left side */}
        <DashSidebar />
      </div>
      {/*profile ---- in right side */}
      {tab === "profile" && <DashboardProfile />}
      {/*Posts*/}
      {tab === "posts" && <DashPosts />}
      {/*Users*/}
      {tab === "users" && <DashUsers />}
    </div>
  )
}
