import { useState, useEffect } from "react";
import { View, Text, Button } from 'react-native-ui-lib';
import { db, auth } from "../firebaseConfig";
import {set, ref, onValue} from "firebase/database";
import { useIsFocused } from "@react-navigation/native";

export const Activity = ({navigation}:any) => {

    const isFocused = useIsFocused();
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const [workouts, setWorkouts] = useState<any>({});
    const getWorkouts = async () => {
        const object = ref(db, 'users/' + auth.currentUser?.uid + '/workouts');
        onValue(object, (s)=>{setWorkouts(s.val());});
    }

    const createW = async () => {
        set(ref(db, 'users/' + auth.currentUser?.uid + '/workouts'), {sets:{eName: 2}, date: new Date(Date.now()).toDateString()});
    }

    createW();
    useEffect(()=>{
        setLoading(false);
        getWorkouts().then(()=>{setLoading(true)});
        console.log(workouts);
    }, [isFocused]);

    useEffect(()=>{
        setLoading(false);
        getWorkouts().then(()=>{setLoading(true)});
    }, [refresh]);
    
    return (loading ?
        <View>
            <Button onPress={()=>setRefresh(refresh+1)}><Text>Refresh</Text></Button>
            {JSON.stringify(workouts) != '{}' ?<Text>{workouts.date} & {workouts.sets.eName}</Text> : <Text></Text>}
        </View> :
        <View>
            <Text>Loading</Text>
        </View>
    )
}