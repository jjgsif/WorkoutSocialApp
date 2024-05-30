import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Dropdown } from 'react-native-element-dropdown';




import { API_URL } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { BuilderSS } from '../styles';
import { Button } from '../utils/Button';
import { RadioGroup } from 'react-native-ui-lib/src/components/radioGroup';
import { RadioButton, TextField } from 'react-native-ui-lib';



export const Builder = () => {
    
    //Holds Collection of Workouts until prepared for transmission to server
    const [workout, setWorkout] = useState({ set: { data: [], name: "" } });

    //Name of Workout
    const [name, setName] = useState("");

    //Keeps track of sets for Weightlifting
    const [sets, setSet] = useState([]);

    //Exercise Name
    const [exerciseName, setEName] = useState("");

    //Cardio | Weightlifting | Other
    const [type, setType] = useState("");

    // //Weight (Decimal)
    // const [weight, setWeight] = useState(0);

    //Unit: lbs/kg (Weightlifting) | km/mi (Cardio)
    const [unit, setUnit] = useState('');

    // //Reps: Weightlifting
    // const [rep, setRep] = useState(0);

    //Cardio-Only Dependancy
    const [distance, setDistance] = useState("");

    //Dependancy for useEffect in Builder()
    const [saveWorkout, setSave] = useState(0);

    //Workout ID for parsing
    const [eId, setEid] = useState(0);

    //Locks Name
    const [active, setActive] = useState(true);

    const [dropdownData, setDropdown] = useState([{label:'Tricep Pushdown', value: 'Tricep Pushdown'}]);

    const [userAuthKey, setKey] = useState(['','']);
    const [count, setCount] = useState(0);
    //Exercise:
    
    useEffect(() => {
        if (saveWorkout > 0) {
            console.log("Collecting Data")
            const cardioCollect = () => {
                return {type: type, exerciseName: exerciseName, distance: distance, unit: unit };
            }
            const weightCollect = () => {
                return {exerciseName: exerciseName, type: type, sets: sets};
            }
            const validateStates = () => {
                switch (type) {
                    case 'Cardio': if (exerciseName != '' && distance != '' && unit != '') { return true; } break;
                    case 'Weightlifting': if (sets.length != 0 || exerciseName === '') { return true; } break;
                    case 'Other': return true;
                }
                return false;
            }

            const resetFields = () => {
                setEName("");
                setType("");
                //setWeight(0);
                setUnit('');
                //setRep(0);
                setDistance("");
                setActive(false);
                setEid(eId+1);
            }

            const collectData = () => {
                let workoutCpy = workout;
                if(name === ''){
                    alert("Enter a name for your workout")
                    return;
                }else {
                    workoutCpy.set.name = name;
                }
                console.log(type);
                switch (type) {
                    //@ts-ignore
                    case 'Cardio': if (validateStates()) { workoutCpy.set.data.push(JSON.stringify(cardioCollect())); resetFields();} else { alert("Please fill out all fields"); } break;
                    //@ts-ignore
                    case 'Weightlifting': if (validateStates()) { workoutCpy.set.data.push(JSON.stringify(weightCollect())); resetFields();} else { alert("Please fill out all fields"); } break;
                    //@ts-ignore
                    case 'Other': if (validateStates()) { workoutCpy.set.data.push(JSON.stringify({})); resetFields();} else { alert("Please fill out all fields"); } break;
                }
                setWorkout(workoutCpy);
                
            }
            collectData();

            //setSave(0);
            //@ts-ignore
            

        }
        console.log(workout);
    }, [saveWorkout])

    useEffect(()=>{
        const saveToServer = async () => {
            const key = await SecureStore.getItemAsync('my-jwt');
            const id = await SecureStore.getItemAsync('user_id');
            //@ts-ignore
            setKey([key, id]);
        }
        saveToServer();
        console.log(userAuthKey[0], userAuthKey[1]);
        if(count > 0){
            console.log(workout);
            if(JSON.stringify(workout.set.data) === '[]'){
                alert("Cannot save an empty workout!");
                return;
            }
            if(workout.set.name === ''){
                alert('Add a name to this workout!');
                return;
            }
            axios.post(`${API_URL}/workouts`, {'user_id': userAuthKey[1], set: JSON.stringify(workout.set)}, {headers: {'Authorization' : `Bearer ${userAuthKey[0]}`, 'Content-Type': 'application/json'}});
        }
    }, [count])

    return (
    <View style={BuilderSS.container}>
        <Text style={BuilderSS.title}>Current Workout</Text>
        <View style={{ flexDirection: 'row', width: "auto", justifyContent: 'center', columnGap: 10  }}>
            <Text style={{ alignSelf: 'center', width: 'auto' }}>Name:</Text>
            <TextField onChangeText={(text) => { setName(text) }} containerStyle={BuilderSS.textInput} style={{textAlign:'center'}}/>
        </View>
        <Text style={BuilderSS.subTitle}>Exercises:</Text>
        <ScrollView style={{ width: '100%', height: '100%' }}>
            <View style={{ flexDirection: 'row', width: 'auto', justifyContent: 'center', columnGap: 10 }}>
                <Dropdown style={{width: '70%', backgroundColor: 'white', borderColor: 'black', borderWidth : 3, borderRadius: 5}} selectedTextStyle={{paddingLeft:5}} itemTextStyle={{paddingLeft:5}} data={dropdownData} onChange={(choice)=>{setEName(choice.value)}} labelField='label' valueField='value'/>
            </View>
            <TypeChoice type={type} setType={setType} />
            <TypeOptions type={type} set = {sets} setSet={setSet} unitVal = {unit} unitHook = {setUnit} saveWorkout={saveWorkout} setSave={setSave} distanceHook={setDistance}/>
        </ScrollView>
        <Button onPress={() => {setCount(count+1)}} text="Save Workout" />
    </View>)
}

const TypeChoice = ({ type, setType }: any) => {

    return (
        <View>
            <Text style={{ alignSelf: 'center', paddingTop: 5, fontWeight: 'bold' }}>Type:</Text>
            <View style={{ flexDirection: 'row', width: 'auto', justifyContent: 'center', columnGap: 5 }}>
                {/*@ts-ignore*/}
                <RadioGroup initialValue={type} onValueChange={value => {setType(value); console.log(value)} } style={{flexDirection:'row', columnGap: 15}}> 
                    <RadioButton value='Cardio' label='Cardio'/>
                    <RadioButton value='Weightlifting' label='Weightlifitng'/>
                    <RadioButton value='Other' label='Custom'/>
                </RadioGroup>
            </View>
        </View>
    )
}

const TypeOptions = ({type, set, setSet, unitVal, unitHook, distanceHook, saveWorkout, setSave}: any) => {
    switch (type) {
        case 'Cardio': return (<CardioUI unitVal={unitVal} unitHook={unitHook} distanceHook = {distanceHook} saveWorkout={saveWorkout} setSave={setSave}/>)
        case 'Weightlifting': return (<WLUI set = {set} setSet={setSet} unitVal={unitVal} unitHook={unitHook} saveWorkout={saveWorkout} setSave={setSave}/>)
        case 'Other': return <CustomUI />
    }
}

const WLUI = ({set, setSet, unitVal, unitHook, saveWorkout, setSave}: any) => {
    const [dep, setDep] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState('');

    

    useEffect(()=>{
        const appendSet = () => {
            const setCpy = set;

            setCpy.push({weight: weight, unit: unitVal, reps: reps})
            setSet(setCpy);
        }
        if(reps > 0){
            appendSet();
        }
        console.log(set);
    }, [dep])

    return (
        <View>
            <Text style={{ alignSelf: 'center', paddingTop: 5, fontWeight: 'bold' }}>Weight: </Text>
            <View style={{ flexDirection: 'row', width: 'auto', justifyContent: 'center', columnGap: 6 }}>
                
                <TextField style={BuilderSS.textInput} placeholder='Weight' onChangeText={(text) => { setWeight(text) }} keyboardType='decimal-pad'  />
                {/*@ts-ignore */}
                <RadioGroup initialValue='' onValueChange={(value) => unitHook(value)} style={{flexDirection:'row', columnGap: 15}}>
                    <RadioButton label='kg' value='kg'/>
                    <RadioButton label='lbs' value='lbs'/>
                </RadioGroup>
            </View>
            <View style={{padding: 10}}>
                {/*@ts-ignore*/}
                <TextField label={'Reps:'} style={{alignSelf:'center', backgroundColor: 'white', borderColor: 'black', borderWidth: 2, height: 'auto', width: '100%', paddingHorizontal:30, textAlign:'center'}} keyboardType='decimal-pad' labelStyle={{alignSelf:'center', fontWeight:'bold'}} containerStyle={{flexDirection:'row', justifyContent:'center', columnGap: 5}} onChangeText={(text)=>{setReps(text)}}/>
            </View>
            <View style = {{flexDirection:'row', justifyContent: 'center', columnGap: 4}}>
                <Button text="Add Set" onPress={() => { setDep(dep+1) }} />
                <Button text="Finish Exercise" onPress={()=>{setSave(saveWorkout + 1)}}/>
            </View>
        </View>
    )
}

const CardioUI = ({ unitVal, unitHook, distanceHook, setSave, saveNum }: any) => {



    return (
        <View>
            <Text style={{ alignSelf: 'center', paddingTop: 5, fontWeight: 'bold' }}>Unit: </Text>
            <View style={{ flexDirection: 'row', width: 'auto', justifyContent: 'center' }}>
            <TextField containerStyle={BuilderSS.textInput} centered={true} placeholder='Distance' style={{textAlign:'center'}} onChangeText={(text) => { distanceHook(text) }} keyboardType='decimal-pad' />
                {/*@ts-ignore */}
                <RadioGroup initialValue = "" onValueChange={value=>{unitHook(value)}} style={{flexDirection:'row', columnGap: 15, padding:10}}>
                    <RadioButton label='mi' value = 'mi'/>
                    <RadioButton label='km' value = 'km'/>
                </RadioGroup>
            </View>
            
            <Button styles={BuilderSS.button} text="Add Exercise" onPress={() => { setSave(saveNum + 1) }} />
        </View>
    )
}

const CustomUI = () => {
    return (
        <View>
            <Text>WIP</Text>
        </View>
    )
}
