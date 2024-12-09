import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";

const Comments = () => {
  const useAuth = true;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Comment</h1>
      {(useAuth && (
        <div className="flex items-center gap-2">
          <textarea
            className="textarea textarea-xs textarea-bordered w-full flex-1"
            placeholder="Write a comment..."
          ></textarea>
          <button className="btn ">Send</button>
        </div>
      )) || <h1>ddd</h1>}
      <div>
        <ListCommets
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maiores."
          date="30 minutes ago"
          image="/culture.png"
          username="Jhon Doe"
        />
        <ListCommets
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur autem dolore necessitatibus alias tempore dolorem laborum adipisci consectetur non ex."
          date="13 Desember 2024"
          username="Jane Gensonata"
        />
        <ListCommets
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae repudiandae reiciendis soluta doloremque maiores cum."
          date="15 Desember 2024"
          image="/coding.png"
          username="Emilie"
        />
        <ListCommets
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis reiciendis quia soluta illo, corrupti qui voluptates ipsam voluptate, eos labore, aliquid dolorum laboriosam tempora quasi modi provident. Expedita, autem modi."
          date="1 Desember 2024"
          image="/style.png"
          username="Dandan"
        />
        <ListCommets
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maiores."
          date="1 Desember 2024"
          username="Jhon Doe"
        />
      </div>
    </div>
  );
};

export default Comments;

const ListCommets: React.FC<{
  comment: string;
  username: string;
  date: string;
  image?: string;
}> = ({ comment, date, image, username }) => {
  return (
    <div>
      <Link href={"/"} className="flex gap-4 mt-6">
        <div>
          <Avatar src={image ? image : "/avatar.png"} alt="username" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[10px]">
            <strong>{username}</strong>
            <span className="text-slate-500 "> {date}</span>
          </h1>
          <p className="text-sm">{comment}</p>
        </div>
      </Link>
    </div>
  );
};
