import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createNavigationContainerRef } from '@react-navigation/native';
import Activity from "../tabs/Activity"
import { Builder } from '../tabs/WorkoutBuilder';

import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();


const Home = ({ navigation }: any) =>{
    //console.log("Rendering Home");
    return(
            <NavigationContainer independent={true}>
            <Tab.Navigator>
              <Tab.Screen name="Your Workouts" component={Activity} options={{ headerShown: false , tabBarIcon: (focused)=>{/*console.log(focused)*/; return (focused.focused? <Ionicons name='book' color={"blue"}/> : <Ionicons name= 'book-outline'/>)}}} />
              <Tab.Screen name="Current Workout" component={Builder} options={{ headerShown: false, tabBarIcon: (obj)=>{return obj.focused ? <Ionicons name="pencil" color={"blue"}/> : <Ionicons name="pencil-outline" /> } }} />
            </Tab.Navigator>
            </NavigationContainer>
    );
}

export const Test = () =>{
    return (
        <View>
            <Text>Test</Text>
        </View>
    )
}



export default Home;