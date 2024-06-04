import {View, Text, TextField, RadioButton, Button, TouchableOpacity } from "react-native-ui-lib";

import Ionicons from '@expo/vector-icons/Ionicons'

import {useEffect, useState} from 'react';

import { setWorkouts } from "../utils/databaseHelpers";


export const Builder = ({route, navigation} : any) => {
    const [exercises, setExercises] = useState<any>([]);

    useEffect(()=>{
        if(route.params){
            setExercises([...exercises, route.params]);
        }
    }, [route.params]);
    return (
        <View backgroundColor="#e6e7f2" height={'100%'} width={'100%'}>
            <Text adjustsFontSizeToFit style={{alignSelf:'center', fontSize: 20, fontWeight:'bold', paddingTop: 5}}>Create Workout</Text>
            <View style={{gap: 5, paddingTop: 5}}>
            <SelectButton text="Weightlifting" iconStyle={{name: "barbell-outline", size: 55, color: 'white'}} containerStyle={{alignSelf:'center', alignItems:'center', padding: 5, borderWidth: 3, backgroundColor: '#5c42ed', borderRadius: 5, height: 120, width: 120, justifyContent: 'center'}} textStyle={{color: 'white'}} onPress={()=>{navigation.navigate('Weightlifting')}}/>
            <SelectButton text="Cardio" iconStyle={{name: 'walk', size: 55, color: 'white'}} containerStyle={{alignSelf:'center', alignItems:'center', padding: 5, borderWidth: 3, backgroundColor: '#5c42ed', borderRadius: 5, height: 120, width: 120, justifyContent: 'center'}} textStyle={{color: 'white'}} onPress={()=>{navigation.navigate('Cardio')}}/>
            <SelectButton text="Custom" iconStyle={{name: 'add', size: 55, color: 'white'}} containerStyle={{alignSelf:'center', alignItems:'center', padding: 5, borderWidth: 3, backgroundColor: '#5c42ed', borderRadius: 5, height: 120, width: 120, justifyContent: 'center'}} textStyle={{color: 'white'}} onPress={()=>{navigation.navigate('Custom')}}/>
            </View>
        </View>
    )
}

const SelectButton = ({containerStyle, textStyle, text, onPress, iconStyle}:any) => {
    return(<TouchableOpacity style={containerStyle} onPress={onPress}>
        <Ionicons name={iconStyle.name} size={iconStyle.size} color={iconStyle.color} />
        <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>)
}

