import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import { FaRegTrashAlt } from "react-icons/fa";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postCollcetionRef = collection(db, "post");

  const deletePost = async (id) => {
    const postDoc = doc(db, "post", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollcetionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPost();
  });

  return (
    <div className="">
      {postList.map((post) => {
        return (
          <div className="bg-gray-800 text-white shadow-lg md:w-[60%] mx-auto">
            <div className=" font-bold text-2xl py-3 justify-center flex">
              <h1>{post.title}</h1>
              {isAuth ? (
                <div className="ml-[20%] md:ml-[40%]">
                  <button onClick={deletePost(post.id)}>
                    <FaRegTrashAlt size={28} />
                  </button>
                </div>
              ) : null}
            </div>
            <div className="text-lg md:w-[80%] mx-auto bg-gray-300">
              <div className="  overscroll-contain text-black">
                {post.postText}
              </div>
              <h3 className="font-semibold text-teal-800">
                @{post.author.name}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
