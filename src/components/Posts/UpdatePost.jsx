import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { fetchPost, updatePostAPI } from "../../APIServices/posts/postsAPI";

const UpdatePost = () => {
  // Get the postId from the URL params
  const { postId } = useParams();

  // Fetch the post details
  const {
    data,
    isLoading: isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["post-details", postId],
    queryFn: () => fetchPost(postId),
  });

  // Mutation for updating the post
  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: data?.postFound?.title || "", // Default to empty strings
      description: data?.postFound?.description || "",
    },
    enableReinitialize: true, // Reinitialize when data changes
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required"),
      description: Yup.string().required("Description is Required"),
    }),
    onSubmit: (values) => {
      // Prepare post data
      const postData = {
        title: values.title,
        description: values.description,
        postId,
      };

      // Trigger the mutation
      postMutation.mutate(postData);
    },
  });

  // Render logic
  if (isFetching) {
    return <p>Loading post details...</p>;
  }

  if (isError) {
    return <p style={{ color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Editing: {data?.postFound?.title || "Untitled"}</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <span style={{ color: "red" }}>{formik.errors.title}</span>
        )}
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description && (
          <span style={{ color: "red" }}>{formik.errors.description}</span>
        )}
        <button type="submit" disabled={postMutation.isLoading}>
          {postMutation.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
      {postMutation.isSuccess && <p>Post updated successfully!</p>}
      {postMutation.isError && (
        <p style={{ color: "red" }}>Error: {postMutation.error?.message}</p>
      )}
    </div>
  );
};

export default UpdatePost;
