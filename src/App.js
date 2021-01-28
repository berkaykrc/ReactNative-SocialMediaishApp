import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SignInScreen, SignUpScreen } from './pages/auth/'
import { HomeScreen, FavoriteScreen } from './pages/main'
import auth from '@react-native-firebase/auth'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function App() {
  const [initializing, setInitializing] = React.useState(true)
  const [hasUserAuth, setUser] = React.useState()

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) {
      setInitializing(false)
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  })

  if (initializing) {
    return null
  }

  return (
    <NavigationContainer>
      {hasUserAuth ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favorite" component={FavoriteScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignIn"
            component={SignInScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUpScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default App
