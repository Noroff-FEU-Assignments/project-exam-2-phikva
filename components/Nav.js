import Link from "next/link";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav() {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  function logout() {
    setAuth(null);

    router.push("/login");
  }

  const [showMenu, setShowMenu] = useState(false);

  let mobileMenu;

  if (showMenu) {
    mobileMenu = (
      <ul className="hideMobileMenu active">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/hotels">Hotels</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>

        {auth ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link href="/create">Create establishment</Link>
            </li>

            <div className="container__btn">
              <button className="btn" onClick={logout}>
                Log out
              </button>
            </div>
          </>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    );
  }

  return (
    <nav>
      <div className="navbar-logo">
        <Link href="/">
          <Image src="/HOLIDAZE.svg" height={100} width={100} />
        </Link>
      </div>

      <div className="menu-icon">
        <FontAwesomeIcon icon={faBars} onClick={() => setShowMenu(!showMenu)} />
      </div>

      {mobileMenu}

      <ul className="hideDesktopMenu active">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/hotels">Hotels</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li className="logged-in">
          {auth ? (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/create">Create establishment</Link>
              </li>

              <div className="container__btn">
                <button className="btn" onClick={logout}>
                  Log out
                </button>
              </div>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
