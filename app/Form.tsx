"use client";
import { ImageIcon, PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.set("file", selectedFile);
      const movieId = await fetch("/api/chat", {
        method: "POST",
        body: data,
      });
      const movieResponse = await movieId.json();
      router.push(`/movie/${movieResponse.movieId}`);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="home  w-screen h-screen flex justify-center items-center">
      <div className="p-3 bg-[#30a46c] w-1/2 rounded-full flex justify-evenly items-center">
        <input
          className="w-[80%] rounded-full border-none p-2 focus:outline-none bg-[#30a46c] text-xl placeholder:text-slate-800"
          type="text"
          placeholder="Add Image of a movie"
          disabled={true}
        />
        <form onSubmit={handleSubmit} action="">
          <Flex gap="5">
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file">
              <ImageIcon cursor="pointer" width="30" height="30" />
            </label>
            <button type="submit" disabled={loading}>
              {!loading && (
                <PaperPlaneIcon cursor="pointer" width="25" height="25" />
              )}
              {loading && (
                <UpdateIcon
                  cursor="pointer"
                  width="25"
                  height="25"
                  className="animate-spin"
                />
              )}
            </button>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default Form;
