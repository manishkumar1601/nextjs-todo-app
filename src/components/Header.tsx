"use client";

import { useAppDispatch } from "@/hooks/reduxStore";
import { useLogoutMutation } from "@/store/apis/authApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { logout as logoutAction, setRefreshToken, setToken, setUserData } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useAuthData } from "@/hooks/authData";
import { toast } from "sonner";

const Header = () => {
  const mobileMenu = useRef<HTMLDivElement | null>(null);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: userData } = useAuthData();
  const [loginBtn, setLoginBtn] = useState(false);
  const [logoutBtn, setLogoutBtn] = useState(false);

  useEffect(() => {
    if (userData?.success) {
      dispatch(setUserData(userData.data?.userData));
      dispatch(setToken(userData.data?.token));
      dispatch(setRefreshToken(userData.data?.refreshToken));
      setLoginBtn(false);
      setLogoutBtn(true);
    } else {
      setLoginBtn(true);
      setLogoutBtn(false);
    }
  }, [userData]);

  function handleMobileMenu(event: MouseEvent) {
    event.preventDefault();
    const menu = mobileMenu.current;
    if (menu?.classList.contains("h-0")) {
      menu?.classList.remove("h-0", "overflow-hidden");
      menu?.classList.add("h-auto", "overflow-visible", "py-6");
    } else {
      menu?.classList.remove("h-auto", "overflow-visible", "py-6");
      menu?.classList.add("h-0", "overflow-hidden");
    }
  }

  async function handleLogout() {
    const response = await logout({}).unwrap();
    if (response?.success) {
      dispatch(logoutAction());
      setLoginBtn(true);
      setLogoutBtn(false);
      toast.success(response?.message);
      router.push("/login");
    }
  }

  return (
    <header className="bg-gray-100 py-5 relative">
      <nav className="flex justify-between items-center w-[80%] mx-auto">
        <button className="block sm:hidden" onClick={handleMobileMenu}>
          <Icon icon="vaadin:lines" />
        </button>
        <Link href="/" className="flex items-center gap-1">
          <h1 className="font-semibold text-3xl">Todo App</h1>
          <Icon icon="mdi:todo-auto" height={25} />
        </Link>
        {logoutBtn && (
          <div className="hidden gap-6 sm:flex sm:items-center">
            <Link href="/profile" className="cursor-pointer">
              <Icon icon="gg:profile" width="32" height="32" />
            </Link>
            <button
              className="px-3 py-1.5 border-2 border-black shadow-[-5px_5px_0px_#000000] cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        {loginBtn && (
          <div className="hidden gap-6 sm:flex">
            <Link
              href="/login"
              className="px-3 py-1.5 border-2 border-black shadow-[-5px_5px_0px_#000000] cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 border-2 border-black shadow-[-5px_5px_0px_#000000] cursor-pointer"
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
      <div
        className="sm:hidden block h-0 overflow-hidden absolute w-full left-0 top-19 bg-gray-100 py-0 transition-height duration-100 ease"
        ref={mobileMenu}
      >
        {loginBtn && (
          <nav className="flex flex-col gap-6 items-center">
            <Link
              href="/login"
              className="px-3 py-1.5 border-2 border-black shadow-[-5px_5px_0px_#000000] cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 border-2 border-black shadow-[-5px_5px_0px_#000000] cursor-pointer"
            >
              Signup
            </Link>
          </nav>
        )}

        {logoutBtn && (
          <nav className="flex flex-col gap-6 items-center">
            <Link
              href="/profile"
              className="px-3 py-1.5 border-2 border-black shadow-[-5px_5px_0px_#000000] cursor-pointer"
            >
              Profile
            </Link>
            <button
              className="px-3 py-1.5 border-2 border-black shadow-[-5px_5px_0px_#000000] cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
