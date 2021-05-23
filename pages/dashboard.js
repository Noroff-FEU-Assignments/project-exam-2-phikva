export default function Dashboard({ messages, enquiries, autData }) {
  console.log(messages);
  console.log(enquiries)


  return (
    <div className="container__admin">
      <div className="container__header__admin">
        <h1>Welcome Admin</h1>
      </div>

      <div className="admin__content">
        <div className="container__messages">
          <h2>Messages</h2>

          {messages.map((message, i) => (
            <div key={i} className="container__messages__message">
              <div>
                From: {message.firstname} {message.lastname}{" "}
              </div>
              <div>Email: {message.email} </div>
              <div>Message: {message.message} </div>
            </div>
          ))}
        </div>

        <div className="container__enquiries">
          <h2>Enquiries</h2>
          {enquiries.map((enquirie, j) => (
            <div key={j} className="container__enquiries__enquirie">
              <div>
                From: {enquirie.firstname} {enquirie.lastname}{" "}
              </div>
              <div>Email: {enquirie.email} </div>
              <div>Phone number: {enquirie.phonenr} </div>
              <div>Roomtype: {enquirie.roomtype} </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const loginInfo = {
    identifier: "admin",
    password: "admin123",
  };

  const login = await fetch(
    `https://holidaze-strapi-api.herokuapp.com/auth/local`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    }
  );

  const loginResponse = await login.json();

  //Get messages from API
  const res = await fetch(
    `https://holidaze-strapi-api.herokuapp.com/messages`,
    {
      headers: {
        Authorization: `Bearer ${loginResponse.jwt}`,
      },
    }
  );
  const messages = await res.json();

  //Get enquiries from API
  const result = await fetch(
    `https://holidaze-strapi-api.herokuapp.com/enquiries`,
    {
      headers: {
        Authorization: `Bearer ${loginResponse.jwt}`,
      },
    }
  );
  const enquiries = await result.json();

  return {
    props: {
      messages: messages,
      enquiries: enquiries,
      autData: loginResponse,
    },
  };
}
