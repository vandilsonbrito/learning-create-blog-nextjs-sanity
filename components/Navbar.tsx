import Link from "next/link";
import { ModeToggle } from "./ui/modalToggle";

export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
        <Link href="/" className="text-3xl font-bold">Next <span className="text-primary">Blog</span></Link>
        <ModeToggle/>
    </nav>
  )
}
