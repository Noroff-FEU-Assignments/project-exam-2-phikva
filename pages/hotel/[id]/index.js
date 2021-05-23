import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Bookpage from "../../bookpage";
import { useRouter } from "next/router";
import { useState } from "react";

export default function hotel({ hotel }) {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container details">
      <div className="modal_container">

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="my-class"
      >
        <button onClick={closeModal}>X</button>
        <Bookpage />
      </Modal>
      </div>
      <Link href="/hotels">
        <div className="container__btn">
          <button className="btn back-btn">Go Back</button>
        </div>
      </Link>
      <div className="detail">
        <div className="detail__details">
          <h1>{hotel.title}</h1>
          <div className="detail__location">
            <FontAwesomeIcon
              icon={faHome}
              style={{ width: "30px", height: "30px" }}
            />{" "}
            {hotel.location}
          </div>
          <div className="detail__phone">
            <FontAwesomeIcon
              icon={faPhone}
              style={{ width: "30px", height: "30px" }}
            />{" "}
            {hotel.phone}
          </div>

          <div className="detail__book">
            <Link href={`bookpage=${hotel.id}`} as={`/hotel/${hotel.id}`}>
              <button className="btn btn_book" onClick={openModal}>
                Book now
              </button>
            </Link>
          </div>

          <div className="detail__price-main">
            <h2>Fra NOK {hotel.price_start}.00</h2>
          </div>
        </div>

        <div className="detail__image">
          <Image
            src={hotel.room_image[0].url}
            alt="Picture of hotelroom"
            width={1920}
            height={1080}
          />
        </div>
        <div className="detail__description">
          <h3>Om</h3>
          <p>{hotel.description}</p>
        </div>
        <div className="detail__price">
          <h3>Pris</h3>
          <div className="detail__price__single">
            <span>Enkeltrom</span>
            <span> NOK {hotel.price_single} pr.person</span>
          </div>
          <div className="detail__price__double">
            <span>Dobbeltrom</span>
            <span> NOK {hotel.price_double} pr.person</span>
          </div>
        </div>
        <div className="detail__facility">
          <h3>Fasiliteter</h3>
          <div className="detail__facility__general">
            <h4>Generelle fasiliteter</h4>
            <p>{hotel.facility_general}</p>
          </div>
          <div className="detail__facility__room">
            <h4>Romfasiliteter</h4>
            <p>{hotel.facility_room}</p>
          </div>
          <div className="detail__facility__capacity">
            <h4>Kapasitet</h4>
            <p>{hotel.capacity}</p>
          </div>
          <div className="detail__facility__special">
            <h4>Spesial</h4>
            <p>{hotel.special}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://holidaze-strapi-api.herokuapp.com/details/${context.params.id}`
  );

  const hotel = await res.json();
  return {
    props: {
      hotel,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://holidaze-strapi-api.herokuapp.com/details`);

  const hotels = await res.json();

  const ids = hotels.map((hotel) => hotel.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
