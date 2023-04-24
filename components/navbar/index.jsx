import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ children, router }) => {
    const path = router;
    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <div
                className={`h-screen top-0 sticky transition-all ease-in-out delay-[25ms] ${
                    open ? "w-[18rem]" : "w-[4rem]"
                }`}
            >
                <div className="flex items-center h-screen bg-white">
                    <div className="flex-1 ">
                        <Image
                            src="/assets/control.png"
                            alt="Picture of the author"
                            width={40}
                            height={40}
                            className={` hidden sm:block absolute z-[100] cursor-pointer  w-[2.5rem] border-gray-500 dark:border-gray-700
              border-2 rounded-full transition-all ease-in-out delay-[25ms] top-[45px] ${
                  !open && "rotate-180"
              } top-8 ${open ? "left-[16.5rem]" : "left-[3.3rem]"}`}
                            onClick={() => setOpen(!open)}
                        />
                        <div
                            className={` ${
                                open
                                    ? "w-72  pl-2"
                                    : "w-0 sm:w-16 overflow-y-hidden "
                            } bg-white dark:bg-gray-700 flex-1 duration-300 h-screen`}
                        >
                            <div
                                className={` bg-white dark:bg-gray-700 p-0 pt-8 relative duration-300 `}
                            >
                                <div className="flex gap-x-4 items-center py-4 -mt-2 pl-2">
                                    <Image
                                        src="/assets/logo.png"
                                        alt="Picture of the author"
                                        width={40}
                                        height={40}
                                        className={`cursor-pointer duration-500 ${
                                            open && "rotate-[360deg]"
                                        }`}
                                    />
                                    <h1
                                        className={` text-black dark:text-white origin-left font-medium text-xl duration-200 ${
                                            !open && "scale-0"
                                        }`}
                                    >
                                        Siap jagres
                                    </h1>
                                </div>
                            </div>

                            <ul
                                className={`${
                                    open
                                        ? "overflow-y-auto"
                                        : "overflow-y-hidden"
                                } max-h-[84vh]  overflow-x-hidden webkit-scroll p-2 `}
                            >
                                <SubSidebar open={open} path={path} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow p-[2rem] pt-[6rem]">{children}</div>
        </div>
    );
};

export default Navbar;

const SubSidebar = ({ open, path }) => {
    const [openOrganisasi, setOpenOrganisasi] = useState(false);
    const [openProject, setOpenProject] = useState(false);
    const [openLaporan, setOpenLaporan] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { theme, setTheme, systemTheme } = useTheme();
    const current = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        current === "dark" ? setIsDarkMode(false) : setIsDarkMode(true);
    }, [current]);

    useEffect(() => {
        const active = path.split("/")[1];
        switch (active) {
            case "organisasi":
                setOpenOrganisasi(true);
                break;
            case "project":
                setOpenProject(true);
                break;
            case "laporan":
                setOpenLaporan(true);
                break;
            default:
                setOpenOrganisasi(false);
                setOpenProject(false);
                setOpenLaporan(false);
                break;
        }
    }, [path]);

    const toggleDarkMode = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    };

    return (
        <>
            <Link
                href="/"
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300 text-black  text-sm items-center gap-x-4 
              mt-2  ${open && "bg-gray-200 dark:bg-gray-500"}`}
            >
                <Image
                    src="/assets/Chart_fill.png"
                    alt="Picture of the author"
                    width={20}
                    height={20}
                    className="invert dark:invert-0"
                />
                <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                >
                    Dashboard
                </span>
            </Link>
            {/* Organisasi */}
            <div
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300 text-black  text-sm 
              mt-9  ${
                  open && "bg-gray-200 dark:bg-gray-500"
              } justify-between items-center`}
                onClick={() => setOpenOrganisasi(!openOrganisasi)}
            >
                <div className="flex items-center gap-x-4 ">
                    <Image
                        src="/assets/Folder.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className="invert dark:invert-0"
                    />
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Organisasi
                    </span>
                </div>

                <Image
                    src="/assets/Arow.png"
                    alt="Picture of the author"
                    width={20}
                    height={20}
                    className={`w-3 h-3 transition-all ease-in-out delay-75 ${
                        !open && "hidden"
                    } ${!openOrganisasi && "rotate-180 "}`}
                />
            </div>
            <ul
                className={`pl-[3rem] transition-all ease-in-out delay-150 ${
                    openOrganisasi
                        ? "max-h-[30vh] overflow-hidden"
                        : "max-h-0 overflow-hidden"
                }`}
            >
                <LinkItem
                    path={path}
                    open={open}
                    href="/organisasi/profil-organisasi"
                    icon={"chat"}
                >
                    Profil Organisasi
                </LinkItem>

                <LinkItem
                    path={path}
                    open={open}
                    href="/organisasi/kantor"
                    icon={"chat"}
                >
                    Kantor
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/organisasi/unit-kerja"
                    icon={"chat"}
                >
                    Unit Kerja
                </LinkItem>

                <LinkItem
                    path={path}
                    open={open}
                    href="/organisasi/staf"
                    icon={"chat"}
                >
                    Staf
                </LinkItem>
            </ul>
            {/* Project */}
            <div
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300 text-black  text-sm 
              mt-4  ${
                  open && "bg-gray-200 dark:bg-gray-500"
              } justify-between items-center`}
                onClick={() => setOpenProject(!openProject)}
            >
                <div className="flex items-center gap-x-4 ">
                    <Image
                        src="/assets/Folder.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className="invert dark:invert-0"
                    />
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Project
                    </span>
                </div>

                <Image
                    src="/assets/Arow.png"
                    alt="Picture of the author"
                    width={20}
                    height={20}
                    className={`w-3 h-3 transition-all ease-in-out delay-75 ${
                        !open && "hidden"
                    } ${!openProject && "rotate-180 "}`}
                />
            </div>
            <ul
                className={`pl-[3rem] transition-all ease-in-out delay-150 ${
                    openProject
                        ? "max-h-[30vh] overflow-hidden"
                        : "max-h-0 overflow-hidden"
                }`}
            >
                <LinkItem
                    path={path}
                    open={open}
                    href="/project/papan-aktivitas"
                    icon={"chat"}
                >
                    Papan Aktivitas
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/project/project"
                    icon={"chat"}
                >
                    Project
                </LinkItem>

                <LinkItem
                    path={path}
                    open={open}
                    href="/project/ajuan-project"
                    icon={"chat"}
                >
                    Ajuan Project
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/project/ajuan-extend-project"
                    icon={"chat"}
                >
                    Ajuan Extend Project
                </LinkItem>
            </ul>
            {/* Laporan */}
            <div
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300 text-black  text-sm 
              mt-4  ${
                  open && "bg-gray-200 dark:bg-gray-500"
              } justify-between items-center`}
                onClick={() => setOpenLaporan(!openLaporan)}
            >
                <div className="flex items-center gap-x-4 ">
                    <Image
                        src="/assets/Folder.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className="invert dark:invert-0"
                    />
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Laporan
                    </span>
                </div>

                <Image
                    src="/assets/Arow.png"
                    alt="Picture of the author"
                    width={20}
                    height={20}
                    className={`w-3 h-3 transition-all ease-in-out delay-75 ${
                        !open && "hidden"
                    } ${!openLaporan && "rotate-180 "}`}
                />
            </div>
            <ul
                className={`pl-[3rem] transition-all ease-in-out delay-150 ${
                    openLaporan
                        ? "max-h-[50vh] overflow-hidden"
                        : "max-h-0 overflow-hidden"
                }`}
            >
                <LinkItem
                    path={path}
                    open={open}
                    href="/laporan/timeline-project-task"
                    icon={"chat"}
                >
                    Timeline Project/Task
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/laporan/progres-project"
                    icon={"chat"}
                >
                    Progres Project
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/laporan/progres-task"
                    icon={"chat"}
                >
                    Progres Task
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/laporan/kendala"
                    icon={"chat"}
                >
                    Kendala
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/laporan/kpi-per-unit-kerja"
                    icon={"chat"}
                >
                    Kpi per Unit Kerja
                </LinkItem>
                <LinkItem
                    path={path}
                    open={open}
                    href="/laporan/kpi-per-staf"
                    icon={"chat"}
                >
                    Kpi per Staf
                </LinkItem>
            </ul>
            <Link
                href={"/akun"}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-300 text-black  text-sm items-center gap-x-4 
              mt-9  ${open && "bg-gray-200 dark:bg-gray-500"}`}
            >
                <Image
                    src="/assets/user.png"
                    alt="Picture of the author"
                    width={20}
                    height={20}
                    className="invert dark:invert-0"
                />
                <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                >
                    Acount
                </span>
            </Link>
            <div
                className={`w-full flex  ${
                    open && " justify-end p-3"
                } transition-all duration-100 ease-out`}
            >
                <div className="relative inline-block w-10 align-middle select-none mt-5">
                    <input
                        type="checkbox"
                        name="toggle"
                        id="toggle"
                        className="toggle toggle-info block appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                    />
                </div>
            </div>
            <br />
            <br />
        </>
    );
};

const LinkItem = ({ href, path, children, icon, open }) => {
    const activ = path === href;
    return (
        <Link
            href={href}
            className={`flex justify-between rounded-md p-2 cursor-pointer  text-black text-sm items-center gap-x-4 mt-2 ${
                activ
                    ? "bg-[#9d9c9c] dark:bg-[#eeeded]  "
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-500 "
            }`}
        >
            <span className={`${!open && "hidden"} origin-left duration-200`}>
                {children}
            </span>
            <Image
                src={`/assets/${icon}.png`}
                alt="Picture of the author"
                width={20}
                height={20}
                className={` ${
                    activ ? "invert-0 dark:invert" : "invert dark:invert-0"
                }  ${!open && "hidden"}`}
            />
        </Link>
    );
};
const LinkItemMenu = ({ href, path, children, icon, open }) => {
    const activ = path === href;
    return (
        <Link
            href="/"
            className={`flex  rounded-md p-2 cursor-pointer  text-black  text-sm items-center gap-x-4 
              mt-2  ${
                  open && "bg-gray-200 dark:bg-gray-500 hover:bg-gray-300"
              }`}
        >
            <Image
                src={`/assets/${icon}.png`}
                alt="Picture of the author"
                width={20}
                height={20}
                className="invert dark:invert-0"
            />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
                {children}
            </span>
        </Link>
    );
};
