import { useState, useEffect } from "react";
import axios from "axios";

export default function MediaDropdown({ register }) {
  const [media, setMedia] = useState([]);

  useEffect(function () {
    async function getMedia() {
      try {
        const response = await axios.get(
          "https://holidaze-strapi-api.herokuapp.com/hotels"
        );

        setMedia(response.data[0].results);
      } catch (error) {
        console.log(error);
      }
    }
    getMedia();
  }, []);

  return (
    <select name="upload_media" ref={register}>
      <option value="">Select media</option>
      {media.map((media) => {
        console.log(media.image_hotel.url);
        return (
          <option key={media.image_hotel.id} value={media.image_hotel.id}>
            {media.image_hotel.name}
          </option>
        );
      })}
    </select>
  );
}

MediaDropdown.defaultProps = {
  register: () => {},
};
