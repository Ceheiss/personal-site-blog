import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const ContactPage = () => {
  return (
    <Layout>
      <h1>Let's get in touch!</h1>
      <p>
        <strong>Twitter: </strong>
        <Link to="https://twitter.com/Cristobalheiss" target="_blank">
          @Cristobalheiss
        </Link>
      </p>
    </Layout>
  )
}

export default ContactPage
