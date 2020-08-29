import React, { FC } from "react"
import { Text } from "react-native"
import { Layout } from "../../component/Layout"
import { useStore } from "../../component/Store"
import { observer } from "mobx-react-lite"

const PageHome: FC = observer(() => {
  const { home } = useStore()
  return (
    <Layout store={home}>
      <Text>Home</Text>
    </Layout>
  )
})

export default PageHome
