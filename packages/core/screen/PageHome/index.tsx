import React, { FC } from "react"
import * as Input from "../../component/Input"
import { Layout } from "../../component/Layout"
import { useStore } from "../../component/Store"
import { observer } from "mobx-react-lite"

const PageHome: FC = observer(() => {
  const { home } = useStore()
  return (
    <Layout store={home}>
      <Input.DateTime store={home} name="test" />
    </Layout>
  )
})

export default PageHome
