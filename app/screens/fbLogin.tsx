import { auth, db } from '../firebaseConfig';

import {loginSS} from '../styles';

import { View, Text, TextField} from 'react-native-ui-lib';

import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { TouchableOpacity } from 'react-native';
import { Button } from '../context/Button';

export const Register = ({ navigation }: any) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            alert(response.user.email + ' is logged in!')
            navigation.navigate('home');
        } catch (error) {
            console.log(error);
        }

    }

    const loginUser = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth,email,password);
            alert(response.user.email + ' is logged in!')
            navigation.navigate('home');
        }catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={loginSS.Container}>
            <Text style={loginSS.titleText}>Login</Text>
            <View style = {loginSS.subContainer}>
                <TextField placeholder="Email" fieldStyle={{borderBottomWidth:1, borderBottomColor: 'black', width:'80%', alignSelf:'center'}} onChangeText={(text)=>{setEmail(text)}}/>
                <TextField placeholder='Password' fieldStyle={{borderBottomWidth:1, borderBottomColor: 'black', width:'80%', alignSelf:'center'}} onChangeText={(text)=>{setPassword(text)}}/>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={loginUser} style={{backgroundColor: '#7a35db', paddingHorizontal: 10, marginVertical: 5, borderRadius: 7.5}}>
                    <Text style = {{color: 'white', textDecorationLine:'underline', textDecorationColor:'white'}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={registerUser} style={{backgroundColor:'#7a35db', paddingHorizontal: 10, marginVertical: 5, borderRadius: 7.5}}>
                    <Text style = {{color: 'white', textDecorationLine:'underline', textDecorationColor:'white'}}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}