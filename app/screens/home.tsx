import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNavigationContainerRef } from '@react-navigation/native';
import Activity from "../tabs/Activity"

const Tab = createBottomTabNavigator();


const Home = ({ navigation }: any) =>{
    console.log("Rendering Home");
    return(
            <NavigationContainer independent={true}>
            <Tab.Navigator>
              <Tab.Screen name="Test" component={Activity} options={{ headerShown: false }} />
              <Tab.Screen name="Test2" component={Test} options={{ headerShown: false }} />
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