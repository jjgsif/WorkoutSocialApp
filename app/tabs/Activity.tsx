import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Button } from '../context/Button';
import axios from "axios";
import * as SecureStore from "expo-secure-store";
//import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { API_URL } from "../context/AuthContext";
import { navigate } from '../Layout'

import { activitySS } from "../styles";
import { useIsFocused } from "@react-navigation/native";


const Activity = ({navigation} : any) => {
    const isFocused = useIsFocused();
    const [count, setCount] = useState(0);
    const [activeWorkout, setWorkout] = useState("pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp");
    const [refresh, setRefresh] = useState(0);
    const [workoutData, setData] = useState([]);

    

    //console.log(activeWorkout.length)
    // useEffect(() => {

    //     const saveWorkout = async () => {
    //         //const user_id = Number(await SecureStore.getItemAsync("user_id"));
    //         const cpy = activeWorkout;
    //         //cpy["user_id"] = user_id
    //         setWorkout(cpy);
    //         const token = await SecureStore.getItemAsync('my-jwt');
    //         const user_id = (await SecureStore.getItemAsync('user_id'));
    //         //console.log(user_id);
    //         return await fetch(`${API_URL}/workouts`, {
    //             method: 'POST',

    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //                 dataType: "JSON"
    //             },
    //             body: JSON.stringify({ workout: { user_id: user_id, set: JSON.stringify(activeWorkout) }, })
    //         })
    //         //console.log(x);
    //     }


    //     JSON.stringify(activeWorkout) == "{}" ? setWorkout("") :saveWorkout();


    // }, [count]);

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
            
    
    
        },[isFocused])
        return (
            <View> 
                {/*@ts-ignore*/}
                {workoutData.map((value, index) => {return (<Button onPress={()=>{navigate('Workout', value)}} text={`Workout on: ${new Date(value.created_at).toLocaleString()}`}/>)})}
                
            </View>
        )
    }
    //<Button text="New Workout" onPress={() => { setCount(count + 1);  setRefresh(refresh+1)}} />
    return (
        <View style={activitySS.container}>
            <Text style={activitySS.title}>Recent Workouts</Text>
            <Button text="New Workout" onPress={()=>{navigation.navigate('Current Workout')}}/>
            <ScrollView style={activitySS.scroll}>
                {WorkoutPane()}
            </ScrollView>
            <Button text="Refresh" onPress={() => { setRefresh(refresh + 1) }} />
        </View>
    )
}





export default Activity;


