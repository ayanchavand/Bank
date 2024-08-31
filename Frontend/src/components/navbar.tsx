import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center gap-8 mb-6">
            <Link to="/" className="text-2xl font-bold font-mono">Bank app</Link>
            <ul className="">
                <li className="flex gap-4 ">
                    <Link to="/addCard">Add Card</Link>
                    <Link to="/viewCard">View Card</Link>
                </li>
            </ul>
        </nav>
    )
}