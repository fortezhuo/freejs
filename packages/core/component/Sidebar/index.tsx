import React, { FC } from "react"
import { View, StyleSheet, ScrollView, ViewProps, Platform } from "react-native"
import { tw } from "@free/tailwind"
import { useSpring, animated } from "react-spring/native"
import { Accordion, AccordionItem } from "../Accordion"
import { SidebarProps } from "@free/core"

const AnimatedView = animated<React.ElementType<ViewProps>>(View)

const Content: FC = () => {
  return (
    <View style={styles.rootContent}>
      <Accordion label="1" icon="home">
        <AccordionItem icon="home">11</AccordionItem>
        <AccordionItem icon="home">12</AccordionItem>
        <AccordionItem icon="home">13</AccordionItem>
        <AccordionItem icon="home">14</AccordionItem>
        <AccordionItem icon="home">15</AccordionItem>
      </Accordion>
      <Accordion label="2" icon="home">
        <AccordionItem icon="home">21</AccordionItem>
        <AccordionItem icon="home">22</AccordionItem>
        <AccordionItem icon="home">23</AccordionItem>
        <AccordionItem icon="home">24</AccordionItem>
        <AccordionItem icon="home">25</AccordionItem>
      </Accordion>
      <Accordion label="3" icon="home">
        <AccordionItem icon="home">31</AccordionItem>
        <AccordionItem icon="home">32</AccordionItem>
        <AccordionItem icon="home">33</AccordionItem>
        <AccordionItem icon="home">34</AccordionItem>
        <AccordionItem icon="home">35</AccordionItem>
      </Accordion>
      <Accordion label="4" icon="home">
        <AccordionItem icon="home">41</AccordionItem>
        <AccordionItem icon="home">42</AccordionItem>
        <AccordionItem icon="home">43</AccordionItem>
        <AccordionItem icon="home">44</AccordionItem>
        <AccordionItem icon="home">45</AccordionItem>
      </Accordion>
      <Accordion label="Profile" icon="sliders">
        <AccordionItem icon="home">51</AccordionItem>
        <AccordionItem icon="home">52</AccordionItem>
        <AccordionItem icon="home">53</AccordionItem>
        <AccordionItem icon="home">54</AccordionItem>
        <AccordionItem icon="home">55</AccordionItem>
        <AccordionItem icon="home">56</AccordionItem>
        <AccordionItem icon="home">57</AccordionItem>
        <AccordionItem icon="home">58</AccordionItem>
      </Accordion>
      <AccordionItem header icon="help-circle">
        About Application
      </AccordionItem>
    </View>
  )
}

export const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const animatedStyle = useSpring({
    config: { duration: 100 },
    from: { width: 0 },
    to: {
      width: isOpen ? tw("w-64").width : 0,
    },
  })

  return (
    <AnimatedView
      testID="Sidebar"
      style={StyleSheet.flatten([styles.rootSidebar, animatedStyle])}
    >
      <ScrollView>
        <Content />
      </ScrollView>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  rootSidebar: tw(`shadow-2xl flex-col`),
  rootContent: tw("flex-no-wrap w-64"),
})
