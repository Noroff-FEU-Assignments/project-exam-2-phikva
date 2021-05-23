import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  firstname: yup.string().required("Please enter your first name"),
  lastname: yup.string().required("Please enter your  lstname"),
  phonenr: yup.number().required("Please enter your nr"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
});

export default function bookpage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    setSubmitting(true);
    router.push("/enquiries");

    try {
      const response = await fetch(
        "https://holidaze-strapi-api.herokuapp.com/enquiries",
        {
          body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            phonenr: phonenr.value,
            roomtype: roomtype.value,
          }),

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (errors) {
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="container__modal">
        <div>
          <h1>Send us an enquirie</h1>
        </div>

        <div className="modal__message">
          <p>
            Please send us a separate message via the contact form, where you
            specify the hotel you want
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={submitting}>
            <div>
              <input
                id="firstname"
                name="firstname"
                placeholder="Firstname"
                type="text"
                {...register("firstname", {
                  required: true,
                })}
              />
            </div>
            <div>
              {" "}
              {errors.firstname && (
                <div className="form__error"> {errors.firstname.message} </div>
              )}
            </div>
            <div>
              <input
                id="lastname"
                name="lastname"
                placeholder="Lastname"
                type="text"
                {...register("lastname", {
                  required: true,
                })}
              />
            </div>
            <div>
              {errors.lastname && (
                <div className="form__error"> {errors.lastname.message} </div>
              )}
            </div>
            <div>
              <input
                id="phonenr"
                name="phonenr"
                placeholder="Phone nr"
                type="number"
                {...register("phonenr", {
                  required: true,
                })}
              />
            </div>
            <div>
              {" "}
              {errors.phonenr && (
                <div className="form__error"> {errors.phonenr.message} </div>
              )}
            </div>
            <div>
              <input
                id="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
            </div>
            <div>
              {errors.email && (
                <div className="form__error"> {errors.email.message} </div>
              )}
            </div>
            <div>
              <label for="roomtype">Choose a roomtype:</label>
              <select name="roomtype" id="roomtype" required>
                <option value="single">Single </option>
                <option value="double">Double </option>
              </select>
            </div>

            <div className="container__btn">
              <button className="btn cta" type="submit">
                {submitting ? "Submitting.." : "Submit"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
