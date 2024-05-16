import {View, Text} from "react-native";
import { useState, useEffect } from "react";

//@ts-ignore
export function Display({route, navigation}){
    const data = route.params;

    console.log(data);

    return(<View>
        <Text>{JSON.parse(data.set)}</Text>
    </View>)
}