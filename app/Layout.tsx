import Home from './screens/home';
import Login from './screens/login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Button, HeaderButton } from './context/Button';
import { Display } from './modal/workoutDisplay';
import { Register } from './screens/fbLogin';
import { TouchableOpacity, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';


const stack = createNativeStackNavigator();
export const stackRef = createNavigationContainerRef();
export const Layout = () => {
    const {authState, onLogout} = useAuth();
    
    return(
      <NavigationContainer ref={stackRef}>
        <stack.Navigator>
          <stack.Screen name='Login' component={Register} options={{headerShown: false}}/>
          <stack.Screen name='home' component={Home} options={{headerRight:()=>{return(<TouchableOpacity style={{backgroundColor: '#7a35db', borderRadius: 7.5}} onPress={()=>{signOut(auth); navigate('Login', null);}}><Text style={{color:'white', padding:5}}>Sign Out</Text></TouchableOpacity>)}}}/>
          <stack.Group screenOptions={{presentation : 'modal'}}>
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