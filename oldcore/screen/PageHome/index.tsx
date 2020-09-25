import React from "react"
import { H4 } from "../../component/Text"
import { Layout } from "../../component/Layout"
import { useHook } from "./hook"

const PageHome = () => {
  const store = useHook()
  return (
    <Layout store={store}>
      <H4>Home</H4>
    </Layout>
  )
}

export default PageHome
