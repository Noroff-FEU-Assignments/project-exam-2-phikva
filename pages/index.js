import SearchBar from "../components/SearchBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <SearchBar />
      <div className="container__hero-section">
        <div className="container__hero-section__slogan">
          <h1>
            <span className="header1">HOLI</span>
            <span className="header2">DAZE</span>
          </h1>

          <div className="container__hero-section__slogan__subheader">
            <p>
              We know how to live in Bergen, so let us give you a experience you
              wont forget
            </p>
          </div>
        </div>
        <div className="container__btn">
          <Link href="/hotels">
            <button className="btn cta">Book Now</button>
          </Link>
        </div>
      </div>
      <section className="mid">
        <div className="container__illustration">
          <ul>
            <li>
              <div className="container__illustration__icon">
                <Image src="/first.svg" height={200} width={200} />
              </div>
            </li>
            <li>
              <div className="container__illustration__icon">
                <Image src="/second.svg" height={200} width={200} />
              </div>
            </li>
            <li>
              <div className="container__illustration__icon">
                <Image src="/third.svg" height={200} width={200} />
              </div>
            </li>
          </ul>
        </div>

        <div className="illustration__booking text">
          <p>Enjoy your vacation</p>
        </div>
        <div className="container__illustration__icon big">
          <Image src="/fourth.svg" height={300} width={480} />
        </div>
        <div className="container__btn">
          <Link href="/hotels">
            <button className="btn cta secondary">See More</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
