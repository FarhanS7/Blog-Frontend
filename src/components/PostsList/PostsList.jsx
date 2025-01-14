import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { deletePostAPI, fetchAllPosts } from "../../APIServices/posts/postsAPI";
const PostsList = () => {
  //!useQuery
  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["lists-posts"],
    queryFn: fetchAllPosts,
  });
  //Post Mutation
  const postMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });
  //delete handler
  const deleteHandler = async (postId) => {
    postMutation
      .mutateAsync(postId)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
  };
  console.log(data);
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && <h1>Posts Fetched</h1>}
      {isError && <h1>{error.message}</h1>}
      {data?.posts.map((post) => {
        return (
          <div key={post?._id}>
            <h1>{post?.title}</h1>
            <p>{post?.description}</p>
            <Link to={`/posts/${post?.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteHandler(post?._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
