import AddPost from "../components/AddEstablishment";

export default function Create() {
  return (
    <>
      <div className="container__add">
        <div>
          <h1>Create Hotel</h1>
        </div>

        <AddPost></AddPost>
      </div>
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
