import Link from "next/link";
import Image from "next/image";

export default function HotelItem({ hotel }) {
  return (
    <div className="container__hotel">
      <div key={hotel.title} className="card">
        <div className="card__title">
          <Image
            src={hotel.image_hotel.url}
            alt="Picture of hotelroom"
            width={500}
            height={250}
          />
          <h2>{hotel.title} </h2>
        </div>

        <div>
          <div className="card__price">From NOK {hotel.price}.00</div>

          <div className="card__location">Location: {hotel.location}</div>
        </div>

        <div className="card__description">
          <p>{hotel.description}</p>
        </div>
        <div className="container__btn hotels">
          <Link href="/hotel/[id]" as={`/hotel/${hotel.id}`}>
            <a>
              <button className="btn btn_enqurie">See more</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
