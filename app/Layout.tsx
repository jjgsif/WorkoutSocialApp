import Home from './screens/home';
import Login from './screens/login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Button } from 'react-native';
import { Display } from './modal/workoutDisplay';


const stack = createNativeStackNavigator();
export const stackRef = createNavigationContainerRef();
export const Layout = () => {
    const {authState, onLogout} = useAuth();
    
    return(
      <NavigationContainer ref={stackRef}>
        <stack.Navigator>
          {authState?.authenticated ? (
            <stack.Screen name = 'Home' component={Home}options={{headerRight: ()=>{return <Button onPress={onLogout} title='Sign Out'/>}}}></stack.Screen>
          ) : (
              <stack.Screen name='Login' component={Login} options={{headerShown: false}}></stack.Screen>
          )
          }
          <stack.Group screenOptions={{presentation : 'card'}}>
            <stack.Screen name="Workout" component={Display}/>
          </stack.Group>
        </stack.Navigator>
      </NavigationContainer>
    )
}
//@ts-ignore
export function navigate(name, params) {
  if (stackRef.isReady()) {
    //@ts-ignore
    stackRef.navigate(name, params);
  }
}