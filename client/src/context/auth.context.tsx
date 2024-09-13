"use client";
import { createContext, useContext, useState } from "react";
import { ChangePassword, Login, Register, ResetPassword, UpdateData, User } from "@/lib/types"
import { AxiosProvier } from "@/Components/AxiosProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AuthType {
    isLoading: boolean;
    registerUser: (data: Register) => void;
    loginUser: (data: Login) => void;
    UserProfile: (token: string) => void;
    UpdateUser: (data: UpdateData) => void;
    ChangePasswordUser: (data: ChangePassword) => void;
    ResetPasswordFn: (data: ResetPassword, token: string) => void;
    logoutUser: () => void;
    data: User;
};

export const AuthContext = createContext<AuthType>({
    isLoading: false,
    registerUser() { },
    loginUser() { },
    UserProfile() { },
    logoutUser() { },
    UpdateUser() { },
    ChangePasswordUser() { },
    ResetPasswordFn() { },
    data: {
        _id: "",
        createdAt: "",
        email: "",
        name: ""
    }
});

export const useAuth = () => {

    return useContext(AuthContext);

};

export const AuthProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<User>({
        _id: "",
        createdAt: "",
        email: "",
        name: ""
    });

    const router = useRouter();

    const registerUser = async (data: Register) => {

        setIsLoading(true);

        try {

            const res = await AxiosProvier.post("/auth/register", data);

            const response = await res.data;

            localStorage.setItem("token", response.token);

            toast.success(response.message);

            router.push("/");

        } catch (error: any) {

            toast.error(error?.response?.data?.message);

        } finally {

            setIsLoading(false);

        }

    };

    const loginUser = async (data: Login) => {

        setIsLoading(true);

        try {

            const res = await AxiosProvier.post("/auth/login", data);

            const response = await res.data;

            localStorage.setItem("token", response.token);

            toast.success(response.message);

            router.push("/");

        } catch (error: any) {

            toast.error(error?.response?.data?.message);

        } finally {

            setIsLoading(false);

        }

    };

    const UserProfile = async (token: string) => {

        setIsLoading(true);

        try {

            const res = await AxiosProvier.get("/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const response = await res.data;

            setUser(response);

        } catch (error: any) {

            router.replace("/login");

            toast.error(error?.response?.data?.message);

        } finally {

            setIsLoading(false);

        }

    };

    const UpdateUser = async (data: UpdateData) => {

        setIsLoading(true);

        try {

            const token = localStorage.getItem("token") as string;

            const res = await AxiosProvier.put("/auth/profile/update", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const response = await res.data;

            await UserProfile(token);

            toast.success(response.msg);

            router.push("/")

        } catch (error: any) {

            toast.error(error?.response?.data?.message);

        } finally {

            setIsLoading(false);

        }

    };

    const ChangePasswordUser = async (data: ChangePassword) => {

        setIsLoading(true);

        try {

            const token = localStorage.getItem("token") as string;

            const res = await AxiosProvier.put("/auth/profile/change-password", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const response = await res.data;

            toast.success(response.msg);

            await logoutUser();

        } catch (error: any) {

            toast.error(error?.response?.data?.message);

        } finally {

            setIsLoading(false);

        }

    };

    const ResetPasswordFn = async (data: ResetPassword, token: string) => {

        setIsLoading(true);

        try {

            const res = await AxiosProvier.put("/auth/reset-password", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const response = await res.data;

            toast.success(response.msg);

            router.push("/");

        } catch (error: any) {

            toast.error(error?.response?.data?.message);

        } finally {

            setIsLoading(false);

        }

    };

    const logoutUser = async () => {

        try {

            localStorage.removeItem("token");

            setUser({
                _id: "",
                createdAt: "",
                email: "",
                name: ""
            });

            toast.success("Logout Success");

            router.push("/login");

        } catch (error: any) {

            toast.error(error.message);

        }

    };

    return (
        <AuthContext.Provider
            value={{ registerUser, loginUser, isLoading, data: user, UserProfile, UpdateUser, ChangePasswordUser, ResetPasswordFn, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    )

};