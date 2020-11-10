import React from "react"
import Animated from "react-native-reanimated"
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer"
import { tw } from "@free/tailwind"
import { observer } from "mobx-react-lite"
import { createStackNavigator } from "@react-navigation/stack"
import { View, Text, StyleSheet } from "react-native"
import { Gradient, Header, IconButton, Icon, useStore, H3 } from ".."
import { theme } from "../../config/theme"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const colors = [theme.primary_1_bg, theme.primary_2_bg]

const ScreenContainer: React.FC<any> = observer(
  ({ navigation, screens, isMobile }) => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitle: () =>
            navigation.canGoBack() ? (
              <H3 style={styles.headerTitle}>Title</H3>
            ) : (
              <Header.InputSearch />
            ),
          headerLeft: () =>
            isMobile ? (
              <IconButton
                name={navigation.canGoBack() ? "chevron-left" : "menu"}
                style={styles.headerLeft}
                onPress={() =>
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.toggleDrawer()
                }
              />
            ) : undefined,
          headerBackground: () => (
            <Gradient style={{ flex: 1 }} colors={colors} />
          ),
          headerRight: () => <Header.MenuUser />,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <screens.PageHome {...props} />}
        </Stack.Screen>
        <Stack.Screen name="User">
          {(props) => <screens.ViewGrid {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
)

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
          onPress={() => props.navigation.navigate("Home")}
          icon={() => <Icon name="home" color="white" size={16} />}
        />
        <DrawerItem
          label="User"
          onPress={() => props.navigation.navigate("User")}
          icon={() => <Icon name="message1" color="white" size={16} />}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export const AuthenticateRoutes = observer(({ screens }: any) => {
  const { app } = useStore()
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
  const isMobile = app.dimension.isMobile

  return (
    <Drawer.Navigator
      drawerType={isMobile ? "slide" : "permanent"}
      overlayColor="transparent"
      drawerContent={(props) => {
        setProgress(props.progress as any)
        return <DrawerContent {...props} />
      }}
    >
      <Drawer.Screen name="Screens">
        {(props) => (
          <ScreenContainer
            {...props}
            isMobile={isMobile}
            screens={screens}
            style={animatedStyle}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
})

const styles = StyleSheet.create({
  headerLeft: tw(`ml-4`),
  headerTitle: tw("text-white"),
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
  drawerStyles: { flex: 1, backgroundColor: "transparent" },
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
  },
})
