import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import Image from "next/image";
const schema = yup.object().shape({
  firstname: yup.string().required("Please enter your first name"),
  lastname: yup.string().required("Please enter your last name"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  textarea: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export default function Contact() {
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
    router.push("/messages");

    try {
      const response = await fetch(
        "https://holidaze-strapi-api.herokuapp.com/messages",
        {
          body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            message: textarea.value,
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
      <div className="container__contact">
        <div>
          <h1>Contact Us</h1>
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
              <textarea
                id="textarea"
                name="textarea"
                placeholder="Message"
                type="text"
                {...register("textarea", {
                  required: true,
                })}
              />
            </div>
            <div>
              {errors.textarea && (
                <div className="form__error"> {errors.textarea.message} </div>
              )}
            </div>

            <div className="container__btn">
              <button className="btn cta" type="submit">
                {submitting ? "Submitting.." : "Submit"}
              </button>
            </div>
          </fieldset>
        </form>
        <div className="container__illustration__icon big">
          <Image src="/fourth.svg" height={300} width={480} />
        </div>
      </div>
    </>
  );
}
