import { Button } from "./ui/button";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center gap-8 ">
            <a href="/" className="text-2xl font-bold font-mono">Bank app</a>
            <ul className="">
                <li className="flex gap-4 ">
                    <a href="/addCard">Add Card</a>
                    <a href="/viewCard">View Card</a>
                </li>
            </ul>
        </nav>
    )
}