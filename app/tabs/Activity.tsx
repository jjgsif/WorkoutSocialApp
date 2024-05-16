import { View, Text, StyleSheet, Button, ScrollView, Pressable } from "react-native";
import axios, { formToJSON } from "axios";
import * as SecureStore from "expo-secure-store";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { API_URL } from "../context/AuthContext";
import { stackRef, navigate } from '../Layout'


const Activity = () => {

    const [count, setCount] = useState(0);
    const [activeWorkout, setWorkout] = useState({});
    const [refresh, setRefresh] = useState(0);
    const [workoutData, setData] = useState([]);


    useEffect(() => {

        const saveWorkout = async () => {
            //const user_id = Number(await SecureStore.getItemAsync("user_id"));
            const cpy = activeWorkout;
            //cpy["user_id"] = user_id
            setWorkout(cpy);
            const token = await SecureStore.getItemAsync('my-jwt');
            const user_id = (await SecureStore.getItemAsync('user_id'));
            //console.log(user_id);
            return await fetch(`${API_URL}/workouts`, {
                method: 'POST',

                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    dataType: "JSON"
                },
                body: JSON.stringify({ workout: { user_id: user_id, set: JSON.stringify(activeWorkout) }, })
            })
            //console.log(x);
        }


        JSON.stringify(activeWorkout) == "{}" ? setWorkout({}) :saveWorkout();


    }, [count]);

    const WorkoutPane = () => {
        
        useEffect(() => {
            const outer = async () => {
                const arrow = async () => {
                    const token = await SecureStore.getItemAsync('my-jwt');
                    return (await axios.get(`${API_URL}/workouts`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }));
                }
    
                const data = await arrow();
                //console.clear()
                //console.log(data.data)
                setData(data.data);
            }
            outer();
            //console.log(workoutData)
            
    
    
        }, [refresh])
        return (
            <View> 
                {workoutData.map((value, index) => {return (<Pressable onPress={()=>{navigate('Workout', value)}}><Text style={ss.text}>{value.created_at} <Ionicons name="link"/></Text></Pressable>)})}
                
            </View>
        )
    }
    //<Button title="New Workout" onPress={() => { setCount(count + 1);  setRefresh(refresh+1)}} />
    return (
        <View style={ss.container}>
            <Text style={ss.title}>Recent Workouts</Text>
            <Button title="New Workout" onPress={()=>{setCount(count+1); }}/>
            <ScrollView style={ss.scroll}>
                {WorkoutPane()}
            </ScrollView>
            <Button title="refresh" onPress={() => { setRefresh(refresh + 1) }} />
        </View>
    )
}





export default Activity;


const ss = StyleSheet.create({
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center', 
        marginBottom: 20,
        marginTop: 20
    },
    container:{
        alignItems: 'center',
        backgroundColor: '#ced4d9',
        height: '100%',
        paddingBottom:10
    },
    text: {
        textAlign: 'center',
        margin: 5,
    }, 
    scroll:{
        marginTop: 20,
        marginBottom: 20,
        width: "85%",
        height: '70%',
        
    }
})