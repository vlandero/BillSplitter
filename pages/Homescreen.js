import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, SafeAreaView, AsyncStorage } from 'react-native'
import Create from '../content/Create'
import { useIsFocused } from '@react-navigation/core'
import BillButton from '../content/BillButton'

export default function Homescreen({navigation}) {
    const [bills,setBills] = useState([])
    const isFocused = useIsFocused()
    useEffect(()=>{
        async function refresh(){
            let temp = await AsyncStorage.getItem('bills');
            temp=JSON.parse(temp)
            setBills(temp)
            // console.log(bills);
            //await AsyncStorage.clear()
        }
        refresh()
    },[isFocused])
    return (
        // <ImageBackground>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Create nav={navigation}></Create>
                    {bills!==null && bills.map((item,index)=>{
                        return(
                            <BillButton nav={navigation} key={index} item={item} ></BillButton>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        // </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#c7c7c7',
        alignItems: 'center',
        // justifyContent: 'center',
    }
})
