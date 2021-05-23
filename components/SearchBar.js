import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";


export default function SearchBar() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const item = [];
    const promises = new Array(19)
      .fill()
      .map((v, i) =>
        fetch(`https://holidaze-strapi-api.herokuapp.com/details/${i + 1}`)
      );
    Promise.all(promises).then((itemArr) => {
      return itemArr.map((value) =>
        value.json().then(
          ({
            title,
            id,
            room_image: {
              0: { url: name },
            },
          }) => item.push({ title, name, id })
        )
      );
    });
    setOptions(item);
    console.log(item);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const setItemDex = (ite) => {
    setSearch(ite);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="container__searchbar">
      <input
        className="container__searchbar__search"
        id="auto"
        onKeyDown={() => setDisplay(!display)}
        placeholder="Search Hotels . ."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {display && (
        <div className="container__search_result">
          {options
            .filter(({ title }) => title.indexOf(search.toLowerCase()))
            .map((value, i) => {
              return (
                <Link href="/hotel/[id]" as={`/hotel/${value.id}`}>
                  <div

                    onClick={() => setItemDex(value.title)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <div className="container__search_result_title">
                      {value.title}
                    </div>
                    <Image
                      className="search_result_image"
                      src={value.name}
                      alt=" image"
                      width={100}
                      height={50}
                    />
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
