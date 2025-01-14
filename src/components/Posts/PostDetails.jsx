import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../APIServices/posts/postsAPI";

const PostDetails = () => {
  //!Get the post id
  const { postId } = useParams();
  //! use Query
  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["posts-details"],
    queryFn: () => fetchPost(postId),
  });
  return (
    <div>
      <h1>{data?.postFound.title}</h1>
      <p>{data?.postFound.description}</p>
    </div>
  );
};

export default PostDetails;
