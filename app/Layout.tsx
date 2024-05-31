import  { Home, HomeFb } from './screens/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Display } from './modal/workoutDisplay';
import { Register } from './screens/fbLogin';
import { TouchableOpacity, Text } from 'react-native';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useEffect, useState } from 'react';


const stack = createNativeStackNavigator();
export const stackRef = createNavigationContainerRef();
export const Layout = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
      onAuthStateChanged(auth, user=>{setUser(user);})
    }, [])
    
    return(
      <NavigationContainer ref={stackRef} >
        <stack.Navigator>
          {user != null ? 
            (<stack.Screen name='Home' component={HomeFb} options={{headerRight: ()=>{return (<TouchableOpacity onPress={()=>signOut(auth)}><Text>Sign Out</Text></TouchableOpacity>)}, headerTitle: ""+auth.currentUser?.displayName}}/>) : 
            (<stack.Screen name='Login' component={Register} options={{headerShown: false}} />)
          }
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