// components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/pet-logo.png" alt="Pet Logo" width={50} height={50} />
        <span>Pet Care App</span>
      </div>
      <div className="nav-links">
        <Link href="/" legacyBehavior>
          <a>Home</a>
        </Link>
        <Link href="/add" legacyBehavior>
          <a>Add Pet</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
