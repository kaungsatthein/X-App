import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostCard from "../components/PostCard";
import { useAuth } from "../providers/AuthProvider";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { authUser } = useAuth();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const api = import.meta.env.VITE_API_URL;
      const res = await fetch(`${api}/posts`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    })();
  }, []);
  const like = (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        post.likes.push(authUser._id);
      }
      return post;
    });
    setPosts(result);
  };
  const unlike = (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        post.likes = post.likes.filter((like) => like !== authUser._id);
      }
      return post;
    });
    setPosts(result);
  };

  return (
    <Box>
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        posts.map((post) => (
          <PostCard post={post} like={like} unlike={unlike} key={post._id} />
        ))
      )}
    </Box>
  );
}
