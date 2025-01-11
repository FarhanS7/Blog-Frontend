import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts } from "../../APIServices/posts/postsAPI";
const PostsList = () => {
  //!useQuery
  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["lists-posts"],
    queryFn: fetchAllPosts,
  });
  console.log(data);
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && <h1>Posts Fetched</h1>}
      {isError && <h1>{error.message}</h1>}
      {data?.posts.map((post) => {
        return (
          <div key={post?.id}>
            <h1>{post?.title}</h1>
            <p>{post?.description}</p>
            <Link to={`/posts/${post?.id}`}>
              <button>Edit</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
