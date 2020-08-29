import React from "react"
import { Text } from "react-native"
import { Layout } from "../../component/Layout"

const PageNotFound = () => (
  <Layout store={{ drawer: true, title: "Not Found" }}>
    <Text>Not Found</Text>
  </Layout>
)

export default PageNotFound
