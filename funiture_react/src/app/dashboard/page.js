'use client';
import { useAppSelector } from "@/store/hooks";

const Dashboard = () => {
    const user = useAppSelector((state) => state.auth.user);
    return ( 
        <div className="axil-dashboard-overview">
            <div className="welcome-text">Hello {user?.name} (not <span>{user?.name}?</span> <a href="/sign-in">Log Out</a>)</div>
            <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
        </div>
     );
}
 
export default Dashboard;