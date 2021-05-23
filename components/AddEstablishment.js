import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MediaDropdown from "./MediaDropdown";
import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  location: yup.string().required("Location is required"),

  price: yup.string().required("Price is required"),
  description: yup.string().required("Description is required"),
});

export default function AddPost() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    if (data.upload_media === "") {
      data.upload_media = null;
    }

    try {
      const response = await axios.post(
        "https://holidaze-strapi-api.herokuapp.com/hotels",
        data,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwMzk0NDk0LCJleHAiOjE2MjI5ODY0OTR9.8PgFMHYm1vsb7_XYH86V4S0fJpba9y-MoMlbUx9VjaY",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <div>{serverError}</div>}
        <fieldset disabled={submitting}>
          <div>
            <MediaDropdown
              name="image_hotel"
              {...register("image_hotel", {
                required: true,
              })}
            />
          </div>

          <div>
            <input
              name="title"
              placeholder="Title"
              {...register("title", {
                required: true,
              })}
            />
          </div>
          <div>
            {errors.title && (
              <div className="form__error">{errors.title.message}</div>
            )}
          </div>
          <div>
            <input
              name="location"
              placeholder="Location"
              {...register("location", {
                required: true,
              })}
            />
          </div>
          <div>
            {errors.location && (
              <div className="form__error">{errors.location.message}</div>
            )}
          </div>
          <div>
            <input
              name="price"
              placeholder="Price"
              {...register("price", {
                required: true,
              })}
            />
          </div>

          <div>
            {errors.price && (
              <div className="form__error">{errors.price.message}</div>
            )}
          </div>
          <div>
            <input
              name="description"
              placeholder="Description"
              {...register("description", {
                required: true,
              })}
            />
          </div>
          <div>
            {errors.description && (
              <div className="form__error">{errors.description.message}</div>
            )}
          </div>
          <div className="container__btn">
            <button className="btn cta">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
