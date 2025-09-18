"use client";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import type { NavigationSidebarProps } from "@/types/types";

export function NavigationSidebar({
    open,
    setOpen,
}: NavigationSidebarProps & {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const links = [
        
        {
            label: "Dashboard",
            href: "/",
            icon: <IconUserBolt className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Employees",
            href: "/employees",
            icon: <IconSettings className="h-5 w-5 shrink-0" />,
        },
    ];
    const emplinks = [
        {
            label: "Employee Dashboard Test",
            href: "/employee/dashboard",
            icon: <IconBrandTabler className="h-5 w-5 shrink-0" />,
        },
        {
            label: "Employee Attendance Test",
            href: "/employee/attendance",
            icon: <IconSettings className="h-5 w-5 shrink-0" />,
        },
    ];

    const logoutLink = {
        label: "Logout",
        href: "/logout",
        icon: <IconArrowLeft className="h-5 w-5 shrink-0" />,
    };

    return (
        <div className="flex h-screen">
            <div
                className={cn(
                    "flex flex-1 md:flex-row top-0 left-0 h-full w-60 text-primary"
                )}
            >
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10 rounded-lg fixed z-20">
                        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto justify-between">
                            <div>
                                {open ? <Logo /> : <LogoIcon />}
                                <div className="mt-8 flex flex-col gap-2">
                                    {links.map((link, idx) => (
                                        <SidebarLink key={idx} link={link} />
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-col gap-2">
                                    {emplinks.map((link, idx) => (
                                        <SidebarLink key={idx} link={link} />
                                    ))}
                                </div>
                            </div>
                            <SidebarLink link={logoutLink} />
                        </div>
                    </SidebarBody>
                </Sidebar>
                <main className="flex-1 ml-20">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
export const Logo = () => {
    return (
        <p className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal">
            <img
                src="/logo.jpeg"
                alt=""
                className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg"
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre"
            >
                Advika Innovate
            </motion.span>
        </p>
    );
};
export const LogoIcon = () => {
    return (
        <p className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal">
            <img
                src="/logo.jpeg"
                alt=""
                className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg"
            />
        </p>
    );
};
