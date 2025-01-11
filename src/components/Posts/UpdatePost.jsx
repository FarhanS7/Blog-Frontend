import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
const UpdatePost = () => {
  //!Get the post id
  const { postId } = useParams();
  //! use Query
  const { data } = useQuery({
    queryKey: ["postsDetails"],
    queryFn: () => fetchAPost(postId),
  });
  //Post Mutation
  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: () => {},
  });
  const formik = useFormik({
    // initial values
    initialValues: {
      title: data?.postFound.title || "",
      description: data?.postFound.description || "",
    },
    enableReinitialize: true,
    // validation schema
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required"),
      description: Yup.string().required("Description is Required"),
    }),
    // submit handler
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description,
      };
      console.log(values);
      postMutation.mutate(postData);
    },
  });
  console.log("mutation", postMutation);

  //get loading state
  const isLoading = postMutation.isPending;
  //isErr
  const isError = postMutation.isError;
  //success
  const isSuccess = postMutation.isSuccess;
  //Error
  const error = postMutation.error;
  console.log({ title });
  return (
    <div>
      <h1>You are Editing-{data?.postFound.title}</h1>

      <div>
        {/* {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post Created Successfully</p>}
        {isError && <p>error.message</p>} */}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            {...formik.getFieldProps("title")}
          ></input>
          {/* Display Error msg */}
          {formik.touched.title && formik.errors.title ? (
            <span>{formik.errors.title}</span>
          ) : (
            <div></div>
          )}
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            {...formik.getFieldProps("description")}
          ></input>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
