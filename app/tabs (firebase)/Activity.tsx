import { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native-ui-lib';
import { ScrollView } from "react-native";
import { getWorkouts } from "../utils/databaseHelpers";
import { useIsFocused } from "@react-navigation/native";
import { navigate } from "../Layout";

export const Activity = ({navigation}:any) => {

    const isFocused = useIsFocused();
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const [workouts, setWorkouts] = useState<any>(null);
    
    useEffect(()=>{
        setLoading(false);
        getWorkouts(setWorkouts).then(()=>{setLoading(true)});
        //console.log(workouts);
    }, [isFocused]);

    useEffect(()=>{
        setLoading(false);
        getWorkouts(setWorkouts).then(()=>{setLoading(true)});
        //console.log(workouts);
    }, [refresh]);
    
    return (loading ?
        <View style={{height: '100%', gap: 10, backgroundColor:'#e6e7f2'}}>
            <View style={{flexDirection: 'row', columnGap: 5, height: "4%", alignContent:'center', justifyContent:'center', width:'100%'}}>
                <TouchableOpacity backgroundColor="black" style={{borderRadius: 7.5, width: '35%'}} onPress={()=>setRefresh(refresh+1)}>
                    <Text color="white" style={{paddingTop: 2, paddingHorizontal: 3, textAlign:'center', fontSize:20}}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity backgroundColor="black" style={{borderRadius: 7.5, width: '35%'}} onPress={()=>{navigation.navigate('Workouts')}}>
                    <Text color="white" style={{paddingTop: 2, paddingHorizontal: 3, textAlign:'center', fontSize:20}}>New Workout</Text>
                </TouchableOpacity>
            </View>
            {workouts ? <ScrollView contentContainerStyle={{paddingBottom: 50, rowGap: 6, flexDirection: 'column-reverse'}}>{workouts.map((index:any)=>{return <CreateWorkoutHistory object={index}/>})}</ScrollView> : <View style={{height:'50%', width: '100%', alignItems:'center', gap:10}}><Text>No Workouts found, add one now!</Text><TouchableOpacity onPress={()=>navigation.navigate('Workouts')} style={{width: '30%', height: '12.5%', borderRadius:15, alignItems:'center'}}backgroundColor="blue"><Text style={{textAlign:'center', color: 'white', paddingTop:3}}>Add a new workout!</Text></TouchableOpacity></View>}
        </View> :
        <View>
            <Text>Loading</Text>
        </View>
    )
}

const CreateWorkoutHistory = ({object} : any) => {
    //console.log(JSON.stringify(object))
    return <WorkoutSlide date={object.date} name={object.name} onPress={()=>navigate('Workout', object)}/>
}

const WorkoutSlide = ({date, onPress, name }: any ) => {
    return (
        <TouchableOpacity onPress={onPress} style={{width:'85%', backgroundColor: '#7a35db', borderRadius: 5, alignSelf:'center', flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
            <View>
                <Text color='white' style={{paddingLeft: 5}}>Workout on:</Text>
                <Text color='white' style={{paddingLeft: 5}}>{date}</Text>
            </View>
            <Text color='white' style={{paddingRight: 5, fontSize: 20}}>{name}</Text>
        </TouchableOpacity>
    )
}