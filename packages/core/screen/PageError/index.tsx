import React from "react"
import { H4 } from "../../component/Text"
import { Layout } from "../../component/Layout"
import { useHook } from "./hook"

const PageError = () => {
  const store = useHook()
  return (
    <Layout store={store}>
      <H4>Fatal Error</H4>
    </Layout>
  )
}

export default PageError
