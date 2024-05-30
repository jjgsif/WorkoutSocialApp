import {View, Text, TouchableOpacity} from 'react-native-ui-lib';

export const workoutButton = ({onPress, index, value, tStyle, textStyle} : any) => {
    return (
        <TouchableOpacity onPress={onPress} style={tStyle}>
            <View style={{flexDirection: 'row'}}>
                <Text style={textStyle}>{index}</Text>
                <Text style={textStyle}>{value}</Text>
            </View>
        </TouchableOpacity>
    )
}

