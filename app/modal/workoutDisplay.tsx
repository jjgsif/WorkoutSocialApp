import { View, Text } from "react-native";
import { useState, useEffect } from "react";

//@ts-ignore
export function Display({ route, navigation }) {
    const data = route.params;
    route.name = data.name + " on " + data.date;

    //console.log(data);

    return (<View>
        <Text>{JSON.stringify(data)}</Text>
    </View>)
}