"use client";
import { AuthProvider } from "@/context/auth.context";

const GlobalContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
};

export default GlobalContextProvider;