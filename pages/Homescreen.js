import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, SafeAreaView, AsyncStorage } from 'react-native'
import Create from '../content/Create'
import { useIsFocused } from '@react-navigation/core'
import BillButton from '../content/BillButton'

export default function Homescreen({navigation}) {
    const [bills,setBills] = useState([])
    const isFocused = useIsFocused()
    async function deleteBill(name){
        let temp = await AsyncStorage.getItem('bills')
        temp=JSON.parse(temp)
        for(let i = 0; i < temp.length ; ++i){
            if(temp[i].name===name){
                temp.splice(i,1);
                i=temp.length;
            }
        }
        setBills(temp);
        temp=JSON.stringify(temp);
        await AsyncStorage.setItem('bills',temp);
    }
    useEffect(()=>{
        async function refresh(){
            let temp = await AsyncStorage.getItem('bills')
            temp=JSON.parse(temp)
            setBills(temp)
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
                            <BillButton deletee = {deleteBill} nav={navigation} key={index} item={item} ></BillButton>
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
