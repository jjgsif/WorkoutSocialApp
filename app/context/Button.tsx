import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export const Button = ({text, onPress} : any) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.4} style={{paddingVertical: 10}}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const HeaderButton = ({text, onPress} : any) => {
    return (
        <TouchableOpacity onPress = {onPress} activeOpacity={.3}>
            <View style ={styles.button}>
            <Text style={styles.buttonText}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 12, 
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: '#1e6cba',
        width: 'auto',
        height:'auto',
        alignSelf:'center',
        verticalAlign: 'bottom', borderColor: 'black', borderWidth: 2
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 12,
        textAlign:'center'
    }
})

