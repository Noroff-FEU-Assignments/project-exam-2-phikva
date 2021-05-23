import HotelItem from "./HotelItem";

export default function HotelList({ hotels }) {
  console.log(hotels[0].results);
  return (
    <>
      {hotels[0].results.map((hotel) => (
        <HotelItem hotel={hotel} />
      ))}
    </>
  );
}
