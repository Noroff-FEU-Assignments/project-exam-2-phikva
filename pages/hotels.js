import HotelList from "../components/HotelList";
import SearchBar from "../components/SearchBar";

export default function Hotels({ hotels }) {
  return (
    <>
      <SearchBar />

      <section className="hotels">
        <div className="hotelpage-header">
          <h1>Hotels and Appartmens</h1>
        </div>

        <div className="hotel__wrapper">
          <HotelList hotels={hotels} />
        </div>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://holidaze-strapi-api.herokuapp.com/hotels");
  const hotels = await res.json();
  return {
    props: {
      hotels,
    },
  };
};
