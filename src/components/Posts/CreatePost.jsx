import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { createPostAPI } from "../../APIServices/posts/postsAPI";

const CreatePost = () => {
  //Post Mutation
  const postMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostAPI,
  });
  const formik = useFormik({
    // initial values
    initialValues: {
      title: "",
      description: "",
    },
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

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post Created Successfully</p>}
      {isError && <p>error.message</p>}
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
