import React from "react"
import { Text } from "react-native"
import { Layout } from "../../component/Layout"
import { useStore } from "../../component/Store"

const PageNotFound = () => {
  const { app } = useStore()
  return (
    <Layout store={app}>
      <Text>Not Found</Text>
    </Layout>
  )
}

export default PageNotFound
