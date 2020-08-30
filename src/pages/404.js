import React from "react"
import Layout from "../components/Layout"
import Head from "../components/Head"
import { Link } from "gatsby"
import gandalf from "../images/gandalf.gif"

const NotFound = () => {
  return (
    <Layout>
      <Head title="404" />
      <div style={{ textAlign: "center" }}>
        <h1>404... Maybe you are lost?</h1>
        <img src={gandalf} alt="gandalf the Grey, super lost in Moria" />
        <h3>
          {" "}
          <Link
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
            }}
            to="/"
          >
            Go back to the homepage
          </Link>
        </h3>
      </div>
    </Layout>
  )
}

export default NotFound
