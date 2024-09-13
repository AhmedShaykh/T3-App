"use client";
import { useAuth } from "@/context/auth.context";
import Link from "next/link"

const Navbar = () => {

    const { data, logoutUser } = useAuth();

    return (
        <header className="w-full bg-zinc-900">
            <nav className="w-[96%] md:w-[80%] py-6 mx-auto flex items-center justify-between">
                <Link href={"/"}>
                    <h1 className="font-semibold text-2xl cursor-pointer">
                        App
                    </h1>
                </Link>

                <ul className="flex items-center gap-x-8">
                    <li className="text-base">
                        <Link href={"/"} className="font-semibold text-xl hover:text-red-500 transition-all duration-300">
                            Dashboard
                        </Link>
                    </li>

                    {!data.email ? (<>
                        <li className="text-base">
                            <Link href={"/login"} className="font-semibold text-xl hover:text-red-500 transition-all duration-300">
                                Login
                            </Link>
                        </li>

                        <li className="text-base">
                            <Link href={"/register"} className="font-semibold text-xl hover:text-red-500 transition-all duration-300">
                                Register
                            </Link>
                        </li>
                    </>) : (
                        <li className="text-base">
                            <button onClick={logoutUser} className="text-white font-semibold text-xl bg-red-600 transition-all duration-300">
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
};

export default Navbar;