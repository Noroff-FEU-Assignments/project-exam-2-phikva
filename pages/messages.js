import Link from "next/link";

export default function Messages() {
  return (
    <div className="container__message">
      <Link href="/hotels">
        <div className="container__btn">
          <button className="btn back-btn">Go Back</button>
        </div>
      </Link>
      <div className="container message-sent__container">
        <h1>Message sent</h1>
        <p>You will hear from us shortly</p>
      </div>
    </div>
  );
}
