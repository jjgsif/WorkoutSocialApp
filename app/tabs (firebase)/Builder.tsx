import { RadioGroup, View, Text, TextField, RadioButton } from "react-native-ui-lib";

import {useState, useEffect} from 'react';

import { setWorkouts } from "../utils/databaseHelpers";

export const Builder = ({navigation} : any) => {
    const [type, setType] = useState<Number>();
    return (
        <View backgroundColor="#e6e7f2" height={'100%'} width={'100%'}>
            <Text adjustsFontSizeToFit style={{alignSelf:'center', fontSize: 20, fontWeight:'bold', paddingTop: 5}}>Create Workout</Text>
            <RadioGroup style={{flexDirection:'row', alignSelf: 'center', gap: 10, padding: 10}} onValueChange={(value:Number)=>{setType(value);}}>
                <RadioButton label={'Weightlifting'} value={0}/>
                <RadioButton label={'Cardio'} value={1}/>
                <RadioButton label={'Other'} value={2}/>
            </RadioGroup>
            {type === 0 ? <WeightliftingScreen/>:<View/>}
            {type === 1 ? <CardioScreen/>:<View/>}
            {type === 2 ? <OtherScreen/>:<View/>}
        </View>
    )
}

const WeightliftingScreen = () => {

    const [workout, setWorkout] = useState();

    const [name, setName] = useState<string>();
    const [sets, setSets] = useState<any>();

    const [exercise, setExercise] = useState<string>();

    



    return(
        <View style={{width:'100%'}}>
            <TextField placeholder={"Workout Name"} onChangeText={(text)=>{setName(text)}} style={{borderBlockColor: 'black', borderBottomWidth:1, minWidth: '15%', maxWidth:'35%', alignSelf:'center'}}/>
            <View style={{flexDirection:'row'}}>
                
            </View>
        </View>
    )
}

const CardioScreen = ({}) => {
    return <View><Text>CA</Text></View>
}

const OtherScreen = ({}) => {
    return <View><Text>OS</Text></View>
}