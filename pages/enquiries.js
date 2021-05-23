import Link from "next/link";
export default function Enquiries() {
  return (
    <div className="container__enquirie">
      <Link href="/hotels">
        <div className="container__btn">
          <button className="btn back-btn">Go Back</button>
        </div>
      </Link>
      <div className="container enquirie-sent__container">
        <h1>Enquirie sent</h1>
        <p>You will hear from us shortly</p>
      </div>
    </div>
  );
}
