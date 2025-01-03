"use client";
import { CategoryInterface } from "@/utils/interface";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Params {
  cat: string;
  choice: boolean;
  view: boolean;
  title: string;
}

const SearchFilter: React.FC<Params> = ({ cat, choice, view, title }) => {
  const [category, setCategory] = useState("");
  const [editorsChoice, setEditorsChoice] = useState(false);
  const [views, setViews] = useState(false);
  const [titleState, setTitleState] = useState("");
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setCategory(cat);
    setEditorsChoice(choice);
    setViews(view);
    setTitleState(title);

    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
      setCategories(await res.json());
    };

    getData();
  }, [cat, choice, view, title]);

  const handlePageChange = () => {
    const params = new URLSearchParams(searchParams.toString()); // Salin query yang ada
    params.delete("page");
    if (category) {
      params.set("cat", category); // Set parameter category baru
    } else {
      params.delete("cat");
    }

    if (editorsChoice) {
      params.set("editorsChoice", editorsChoice.toString());
    } else {
      params.delete("editorsChoice");
    }

    if (views) {
      params.set("views", views.toString());
    } else {
      params.delete("views");
    }

    if (titleState) {
      params.set("title", titleState);
    } else {
      params.delete("title");
    }

    router.push(`?${params.toString()}`); // Redirect dengan parameter baru
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="join w-full max-w-xl">
        <input
          className="input input-bordered join-item w-full"
          placeholder="Title"
          value={titleState}
          onChange={(e) => setTitleState(e.target.value)}
        />
        <button className="btn join-item" onClick={handlePageChange}>
          Search
        </button>
        <label htmlFor="my_modal_6" className="btn btn-neutral join-item">
          Filter
        </label>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex gap-10">
            <div className="flex-1">
              <h1 className="font-bold">CATEGORY</h1>

              {categories.map((item: CategoryInterface) => (
                <div className="form-control" key={item.id}>
                  <label className="label cursor-pointer">
                    <span className="label-text">{item.slug}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={category === item.slug}
                      onChange={() =>
                        category === item.slug
                          ? setCategory("")
                          : setCategory(item.slug)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex-1">
              <h1 className="font-bold">SORT BY</h1>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Editors Choice</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={editorsChoice}
                    onChange={() => setEditorsChoice(!editorsChoice)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">View Count</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={views}
                    onChange={() => setViews(!views)}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
            <label
              onClick={handlePageChange}
              htmlFor="my_modal_6"
              className="btn btn-neutral"
            >
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;