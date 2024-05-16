import {View, Text, TextInput, StyleSheet, Button, Image} from 'react-native'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

const Login = () =>{
    console.log("Rendering Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {onLogin, onRegister} = useAuth();

    const login = async () => {
        //console.log(email, password);
        const result = await onLogin!(email,password);

        //console.log(result.data);
        //console.log(email, password);
        if(result && result.error){
            alert("Unable to Login"); 
        }
    }
    const register = async () => {
        //console.log(email, password);
        const result = await onRegister!(email,password);
        


        if(result && result.error){
            alert("Unable to Register");
        }else{
            login();
        }
    }

    return(
    <View style = {ss.Container}>
        <View style = {{alignItems: 'center'}}>
        <Ionicons name="barbell" size={70} color="black" />
        <Text style={ss.titleText}>Login</Text>
        </View>
        <View style = {ss.subContainer}>
        <TextInput style={ss.textInput} placeholder='Email' autoCapitalize='none' keyboardType='email-address' onChangeText={(text)=>{setEmail(text)}}/>
        <TextInput style={ss.textInput} placeholder='Password' autoCapitalize='none' onChangeText={(text)=>{setPassword(text)}} secureTextEntry/>
        <Button title= "Login" onPress={login}/>
        <Button title= "Register" onPress={register}/>
        </View>
        
    </View>
    );
}

const ss = StyleSheet.create({
    Container:{
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'

    }, 
    subContainer:{
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        width: '100%',
        height: 'auto'
    },
    titleText:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 20,
        marginBottom: 20
    }, 
    textInput:{
        width: '70%',
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderBlockColor: '#000000',
        borderWidth: 3
    }
});

export default Login;