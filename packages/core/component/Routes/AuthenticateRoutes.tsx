import React from "react"
import Animated from "react-native-reanimated"
import { observer } from "mobx-react-lite"
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import { View, Text, StyleSheet } from "react-native"
import { Icon } from ".."
import { IconButton } from "../Icon"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const Screens = ({ navigation, style, screen }: any) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: undefined,
          headerLeft: () => (
            <IconButton
              name="menu"
              size={18}
              color="black"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <screen.PageHome {...props} />}
        </Stack.Screen>
        <Stack.Screen name="User">
          {(props) => <screen.ViewGrid {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  )
}

const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View>
        <Text>FreeJS</Text>

        <DrawerItem
          label="Home"
          labelStyle={styles.drawerLabel}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate("Home")}
          icon={() => <Icon name="home" color="white" size={16} />}
        />
        <DrawerItem
          label="User"
          labelStyle={{ color: "white", marginLeft: -16 }}
          style={{ alignItems: "flex-start", marginVertical: 0 }}
          onPress={() => props.navigation.navigate("User")}
          icon={() => <Icon name="message1" color="white" size={16} />}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export const AuthenticateRoutes = observer(({ screen }: any) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0))
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  })
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  })

  const animatedStyle = { borderRadius, transform: [{ scale }] }

  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: "white",
        inactiveTintColor: "white",
      }}
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      drawerContent={(props) => {
        setProgress(props.progress as any)
        return <DrawerContent {...props} />
      }}
    >
      <Drawer.Screen name="Screens">
        {(props) => (
          <Screens {...props} screen={screen} style={animatedStyle} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
})

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: "50%", backgroundColor: "transparent" },
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
  },
})
