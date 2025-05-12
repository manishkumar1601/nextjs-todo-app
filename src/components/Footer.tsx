import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full">
        <div className="flex flex-col justify-center items-center gap-3 text-center sm:flex-row sm:justify-between w-[80%] mx-auto py-5">
            <Link href="/" className="flex items-center gap-1">
                <h1 className="font-semibold text-2xl">Todo App</h1>
                <Icon icon="mdi:todo-auto" height={15} />
            </Link>
            <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer