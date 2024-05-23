import { TextInput } from 'react-native'
import { View, Text } from 'react-native-ui-lib';
import { Button } from '../context/Button';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { loginSS } from '../styles';

const Login = () => {
    //console.log("Rendering Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { onLogin, onRegister } = useAuth();

    const login = async () => {
        //console.log(email, password);
        const result = await onLogin!(email, password);

        //console.log(result.data);
        //console.log(email, password);
        if (result && result.error) {
            alert("Unable to Login");
        }
    }
    const register = async () => {
        //console.log(email, password);
        const result = await onRegister!(email, password);



        if (result && result.error) {
            alert("Unable to Register");
        } else {
            login();
        }
    }

    return (
        <View style={loginSS.Container}>
            <View style={{ alignItems: 'center' }}>
                <Ionicons name="barbell" size={70} color="black" />
                <Text style={loginSS.titleText}>Login</Text>
            </View>
            <View style={loginSS.subContainer}>
                <TextInput style={loginSS.textInput} placeholder='Email' autoCapitalize='none' keyboardType='email-address' onChangeText={(text) => { setEmail(text) }} />
                <TextInput style={loginSS.textInput} placeholder='Password' autoCapitalize='none' onChangeText={(text) => { setPassword(text) }} secureTextEntry />
                <Button text="Login" onPress={login} />
                <Button text="Register" onPress={register} />
            </View>

        </View>
    );
}



export default Login;