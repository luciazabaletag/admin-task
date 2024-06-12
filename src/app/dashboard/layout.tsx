import Sidebar from "../components/Sidebar/Sidebar";
import NavBar from "../components/NavBar/NavBar";
import React from "react"

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
      return (
        <>
            <div className="bg-slate-950 min-h-screen flex">
                <div className=" border-r border-gray-900 relative">
                    <Sidebar />
                </div>
                <div className="w-full max-h-screen overflow-y-auto scroll-smooth">
                    <NavBar /> 
                        <div className="w-full">
                            {children}
                        </div>
                </div>
            </div>
        </>
    );
}