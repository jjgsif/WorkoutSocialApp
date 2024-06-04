import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Builder } from "./Builder";
import { TouchableOpacity, View, Text, TextField } from "react-native-ui-lib";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const stack = createNativeStackNavigator();

export const BuilderNav = () => {

    return (
        <NavigationContainer independent={true}>
            <stack.Navigator>
                <stack.Screen name="Builder" component={Builder} options={{ headerShown: false }} />
                <stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
                    <stack.Screen name={"Cardio"} component={CardioContainer} />
                    <stack.Screen name={"Weightlifting"} component={WeightliftingContainer} />
                    <stack.Screen name={"Custom"} component={CustomContainer} />

                </stack.Group>
            </stack.Navigator>
        </NavigationContainer>
    )
}

const CardioContainer = ({ navigation }: any) => {
    const [exercise, setExercise] = useState({answer: 'hello'});
    useEffect(() => navigation.setOptions({ headerShown: true, headerLeft: () => { return (<TouchableOpacity style={{paddingRight: Platform.OS === 'ios' ? 0 : 15}} onPress={() => navigation.navigate('Builder', exercise)}><Ionicons name="arrow-back" size={15}/></TouchableOpacity>) } }), []);
    return (<View></View>)
}

const WeightliftingContainer = ({ navigation }: any) => {
    const [exercise, setExercise] = useState({exerciseName: '', sets: []});
    useEffect(() => navigation.setOptions({ headerShown: true, headerLeft: () => { return (<TouchableOpacity style={{paddingRight: Platform.OS === 'ios' ? 0 : 15}} onPress={() => navigation.navigate('Builder', exercise)}><Ionicons name="arrow-back" size={15}/></TouchableOpacity>) } }), []);
    return (<View style={{backgroundColor: 'white', height: '100%'}}>
        <TextField label="Exercise Name" containerStyle={{alignItems:'center', width: '100%',flexDirection:'row', paddingTop: 10}} style={{borderBlockColor: 'black', borderBottomWidth: 1.5, width: '30%'}} placeholderTextColor={'black'} onChangeText={(text)=>{setExercise({...exercise, exerciseName: text})}}/>
        
    </View>)
}

const CustomContainer = ({ navigation }: any) => {
    const [exercise, setExercise] = useState({answer: 'hello'});
    useEffect(() => navigation.setOptions({ headerShown: true, headerLeft: () => { return (<TouchableOpacity style={{paddingRight: Platform.OS === 'ios' ? 0 : 15}} onPress={() => navigation.navigate('Builder', exercise)}><Ionicons name="arrow-back" size={15}/></TouchableOpacity>) } }), []);
    return (<View></View>)
}