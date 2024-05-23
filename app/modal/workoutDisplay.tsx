import {View, Text} from "react-native";
import { useState, useEffect } from "react";

//@ts-ignore
export function Display({route, navigation}){
    const data = route.params;
    console.log(JSON.parse(data.set).data)
    //console.log(data);

    return(<View>
        <Text>{JSON.parse(JSON.parse(data.set).data[0]).exerciseName}</Text>
    </View>)
}