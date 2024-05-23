import { StyleSheet } from "react-native"



export const activitySS = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#dbdbd9',
        height: '100%',
        paddingBottom: 10
    },
    text: {
        textAlign: 'center',
        color:'white',
        margin: 5,
        backgroundColor: '#1e6cba',
        borderColor: 'black',
        borderWidth: 5, 
        padding: 10

    },
    scroll: {
        marginTop: 20,
        marginBottom: 20,
        width: "85%",
        height: '70%',

    }

});

export const loginSS = StyleSheet.create({
    Container: {
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'

    },
    subContainer: {
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        width: '100%',
        height: 'auto'
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 20,
        marginBottom: 20
    },
    textInput: {
        width: '70%',
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderBlockColor: '#000000',
        borderWidth: 3
    }
});

export const BuilderSS = StyleSheet.create({
    title: {
        alignSelf: 'center',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#dbdbd9',
        height: '100%',
        paddingBottom: 10
    },
    textInput: { 
        backgroundColor: 'white', 
        borderColor: 'black', 
        borderWidth: 2, 
        width: 'auto', 
        maxWidth: '80%', 
        minWidth: '40%', 
        //lineHeight: 10, 
        alignSelf:'center', 
        textAlign: 'center', 
        height: 35, textAlignVertical:'center'
    }, 
    subTitle: {
        alignSelf: 'center',
        padding: 7.5,
        fontWeight: 'bold',
        fontSize: 15
    }, 
    button:{
        alignSelf:'center',
        paddingTop: 10,
        color : '#1168bf',

    }

});

