import { useQuery } from "@tanstack/react-query";
import React from "react";

const PostsList = () => {
  //!useQuery
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["lists-posts"],
    queryFn: fetchAllPosts,
  });
  console.log(data);
  return (
    <div>
      
    </div>
  );
};

export default PostsList;
