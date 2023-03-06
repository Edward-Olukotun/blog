import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import { FaRegTrashAlt } from "react-icons/fa";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postCollcetionRef = collection(db, "post");

  const getPost = async () => {
    const data = await getDocs(postCollcetionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      {postList.map((post, id) => {
        console.log("post id text", post.id);
        return (
          <div
            className="bg-gray-800 text-white shadow-lg md:w-[60%] mx-auto pb-5"
            key={id}
          >
            <div className=" font-bold text-2xl py-8 justify-center flex">
              <h1>{post.title}</h1>
              {isAuth ? (
                <div className="ml-[20%] md:ml-[40%]">
                  <button
                    onClick={async function () {
                      await deleteDoc(doc(db, "post", post.id));
                      window.location.reload();
                    }}
                  >
                    <FaRegTrashAlt size={28} />
                  </button>
                </div>
              ) : null}
            </div>
            <div className="text-lg md:w-[80%] mx-auto bg-gray-300 bt-4">
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
