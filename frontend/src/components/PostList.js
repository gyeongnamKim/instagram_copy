import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "Post";

const apiUrl = "http://127.0.0.1:8000/api/posts/";

function PostList() {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    Axios.get(apiUrl)
      .then((response) => {
        const { data } = response;
        setPostList(data);
        console.log("loaded reponse:", response);
      })
      .catch((error) => {
        //error.response;
      });
    console.log("mounted");
  }, []);
  return (
    <div>
      <h2>Post List</h2>
      {postList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
