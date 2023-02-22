import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./../firebase-config";
import { useNavigate } from "react-router-dom";
function Createpost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollcetionRef = collection(db, "post");
  let navigate = useNavigate();

  const createpost = async () => {
    await addDoc(postCollcetionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="">
      <div className="mt-10 w-[40%] mx-auto text-center bg-black text-white rounded-md">
        <h1 className="font-bold text-xl my-3">create a post</h1>
        <div className=" mt-10 flex flex-col w-[80%] mx-auto text-start">
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            placeholder="Title..."
            className="text-black"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className=" my-10 flex flex-col w-[80%] mx-auto text-start h-fit">
          <label htmlFor="post">Post:</label>
          <textarea
            placeholder="post..."
            className="text-black h-[100px]"
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <button
          onClick={createpost}
          className="h-[30px] bg-gray-300 my-4 text-black w-[80%] mx-auto"
        >
          Submit post
        </button>
      </div>
    </div>
  );
}

export default Createpost;
