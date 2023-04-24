import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({ children, router }) {
    const path = router;
    const [open, setOpen] = useState(true);

    return (
        <div className="flex flex-row ">
            <div className=" relative flex z-50 select-none">
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
                        open ? "w-72  pl-2" : "w-0 sm:w-16 overflow-y-hidden "
                    } bg-white dark:bg-gray-700 relative duration-300 h-screen`}
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
                                Siap Agile
                            </h1>
                        </div>
                    </div>

                    <ul
                        className={`${
                            open ? "overflow-y-auto" : "overflow-y-hidden"
                        } max-h-[84vh]  overflow-x-hidden webkit-scroll p-2 `}
                    >
                        <SubSidebar open={open} path={path} />
                    </ul>
                </div>
            </div>
            <Image
                src="/assets/control.png"
                alt="Picture of the author"
                width={40}
                height={40}
                className={`  block sm:hidden absolute z-[100] cursor-pointer  w-[2.5rem] border-dark-purple
           border-2 rounded-full transition-all ease-out ${
               !open && "rotate-180"
           } top-8 ${open ? "left-[16.5rem]" : "left-[.7rem]"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="w-full max-h-[100vh]">
                <div className="w-full h-[123.5rem] bg-red-200 dark:bg-gray-700 shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
}

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
                <Link
                    href="/laporan/progres-project"
                    className="flex  justify-between bg-gray-100 dark:bg-gray-400 hover:bg-gray-200 rounded-md p-2 cursor-pointer  text-black text-sm items-center gap-x-4 mt-2 "
                >
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Progres Project
                    </span>
                    <Image
                        src="/assets/chat.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className={`invert dark:invert-0 ${!open && "hidden"}`}
                    />
                </Link>
                <Link
                    href="/laporan/progres-task"
                    className="flex  justify-between bg-gray-100 dark:bg-gray-400 hover:bg-gray-200 rounded-md p-2 cursor-pointer  text-black text-sm items-center gap-x-4 mt-2 "
                >
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Progres Task
                    </span>
                    <Image
                        src="/assets/chat.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className={`invert dark:invert-0 ${!open && "hidden"}`}
                    />
                </Link>
                <Link
                    href="/laporan/kendala"
                    className="flex  justify-between bg-gray-100 dark:bg-gray-400 hover:bg-gray-200 rounded-md p-2 cursor-pointer  text-black text-sm items-center gap-x-4 mt-2 "
                >
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Kendala
                    </span>
                    <Image
                        src="/assets/chat.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className={`invert dark:invert-0 ${!open && "hidden"}`}
                    />
                </Link>
                <Link
                    href="/laporan/kpi-per-unit-kerja"
                    className="flex  justify-between bg-gray-100 dark:bg-gray-400 hover:bg-gray-200 rounded-md p-2 cursor-pointer  text-black text-sm items-center gap-x-4 mt-2 "
                >
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Kpi per Unit Kerja
                    </span>
                    <Image
                        src="/assets/chat.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className={`invert dark:invert-0 ${!open && "hidden"}`}
                    />
                </Link>
                <Link
                    href="/laporan/kpi-per-staf"
                    className="flex  justify-between bg-gray-100 dark:bg-gray-400 hover:bg-gray-200 rounded-md p-2 cursor-pointer  text-black text-sm items-center gap-x-4 mt-2 "
                >
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                        Kpi per staf
                    </span>
                    <Image
                        src="/assets/chat.png"
                        alt="Picture of the author"
                        width={20}
                        height={20}
                        className={`invert dark:invert-0 ${!open && "hidden"}`}
                    />
                </Link>
            </ul>
            <li
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
            </li>
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
                    ? "bg-[#e8e6e6] dark:bg-[#8d8989] hover:bg-gray-100"
                    : "bg-gray-100 dark:bg-gray-400 hover:bg-gray-200"
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
                className={`invert dark:invert-0 ${!open && "hidden"}`}
            />
        </Link>
    );
};
