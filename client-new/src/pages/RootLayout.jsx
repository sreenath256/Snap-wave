import { Outlet } from "react-router-dom";
import TopBar from "../components/Shared/TopBar";
import LeftSidebar from "../components/Shared/LeftSidebar";
import RightSidebar from "../components/Shared/RightSidebar";
import Bottombar from "../components/Shared/Bottombar";

const RootLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64">
          <TopBar />
          <LeftSidebar />
        </aside>
        <main className="flex-1 flex justify-center overflow-y-auto">
          <Outlet />
        </main>
        <aside className="hidden lg:block w-80">
          <RightSidebar />
        </aside>
      </div>
      <div className="w-full">
        <Bottombar />
      </div>
    </div>
  );
};

export default RootLayout;
