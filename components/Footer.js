import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <nav className="footer__nav">
        <div className="footer-logo">
          <Link href="/">
            <Image src="/HOLIDAZE-alt.svg" height={100} width={100} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/hotels">Hotels</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
