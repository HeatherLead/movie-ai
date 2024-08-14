"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Badge } from "@radix-ui/themes";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
interface ImageNode {
  url: string;
}
interface Genre {
  text: string;
}
interface ImageEdge {
  node: ImageNode;
}
interface movieData {
  titleText: {
    text: string;
  };
  genres: {
    genres: Genre[];
  };
  titleMainImages: {
    edges: ImageEdge[];
  };
  plot: {
    plotText: {
      plainText: string;
    };
  };
  releaseYear: {
    year: number;
  };
}

const page = () => {
  const [data, setData] = useState<movieData | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const url = usePathname();
  const parts = url.split("/");
  const movieId = parts[parts.length - 1];

  useEffect(() => {
    async function run() {
      try {
        const response = await fetch(`/api/movie/${movieId}`, {
          method: "POST",
          body: JSON.stringify({ movieId: movieId }),
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
          setBackgroundUrl(data.titleMainImages.edges[0].node.url);
        } else {
          console.error("Failed to fetch movie data:");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }

    run();
  }, []);

  type GenreColor =
    | "cyan"
    | "jade"
    | "grass"
    | "lime"
    | "sky"
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "mint";

  const GenreColors: { [key: string]: GenreColor } = {
    Action: "gray",
    Adult: "gold",
    Adventure: "bronze",
    Animation: "brown",
    Biography: "yellow",
    Comedy: "amber",
    Crime: "orange",
    Documentary: "tomato",
    Drama: "red",
    Family: "ruby",
    Fantasy: "crimson",
    "Film Noir": "pink",
    "Game Show": "plum",
    History: "purple",
    Horror: "violet",
    Musical: "iris",
    Music: "indigo",
    Mystery: "blue",
    News: "cyan",
    "Reality-TV": "tomato",
    Romance: "jade",
    "Sci-Fi": "grass",
    Short: "grass",
    Sport: "lime",
    "Talk-Show": "mint",
    Thriller: "sky",
    War: "gray",
    Western: "gold",
  };

  return (
    <div>
      {data && (
        <div
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
          className="w-screen h-screen bg-cover p-5 lg:p-10"
        >
          <div className=" grid overflow-hidden  text-white w-full h-full  shadow-2xl rounded-3xl backdrop-blur-sm border-[1px] border-black">
            <div className="  p-5  relative">
              <Link href="/" className=" text-black flex items-center gap-2">
                <ArrowLeftIcon />
                Home
              </Link>
              <h1 className="  text-7xl tracking-wider mt-5 lg:mt-20 font-bold   ">
                {data.titleText.text}
              </h1>
              <p className=" text-sm pl-2 mt-2">
                Release Year :- {data.releaseYear.year}
              </p>
              <p className="line-clamp-1 lg:line-clamp-3  lg:hover:line-clamp-none lg:w-1/3 mt-10  ">
                {data.plot.plotText.plainText}
              </p>
              {data.genres.genres.map((item, index) => (
                <Badge
                  key={index}
                  color={GenreColors[item.text]}
                  radius="small"
                  variant="solid"
                  className=" m-2"
                >
                  {item.text}
                </Badge>
              ))}

              <div className=" w-full mt-20 flex gap-5 absolute bottom-14  ">
                {data.titleMainImages.edges.slice(0, 4).map((item, index) => (
                  <img
                    onClick={() => {
                      setBackgroundUrl(item.node.url);
                    }}
                    key={index}
                    className="w-1/5 border-[1px] border-white rounded-md aspect-video cursor-pointer"
                    src={item.node.url}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
