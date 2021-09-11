import React,{useEffect, useState} from 'react'
import { Button, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Platform, ScrollView, AsyncStorage } from 'react-native'
import BillUser from '../content/BillUser'
import RNPickerSelect from "react-native-picker-select";
import { Header, useHeaderHeight } from '@react-navigation/stack';

export default function BillPage({route ,navigation}) {
    const {item} = route.params
    const [bill,setBill] = useState(item)
    const [open,setOpen] = useState('')
    const [pickedValue,setPickedValue]=useState('')
    const [text,setText] = useState('')
    useEffect(()=>{
        navigation.setOptions({headerTitle:item.name})
        // console.log(item);
    },[])
    const picker = []
    item.users.forEach((x)=>{
        picker.push({
            label:x.name,
            value:x.name
        })
    })
    const addToBill = async () => {
        if(!pickedValue)
            return alert('Pick someone')
        let payer = pickedValue
        if(isNaN(text)||!text)
            return alert('Fill in a valid number')
        let sum = parseInt(text)
        let billCopy = bill
        let sumToAdd = Math.ceil(sum/(bill.users.length))
        console.log(sumToAdd,sum,bill.users.length);
        let payerIndex
        for(let i = 0; i < billCopy.users.length; ++i)
            if(billCopy.users[i].name===payer){
                payerIndex = i
                i = billCopy.users.length
            }
        for(let key in billCopy.users[payerIndex].others){
            let crtIndex = billCopy.users.findIndex(obj=>obj.name===key)
            if(billCopy.users[crtIndex].others[payer] > sumToAdd){
                billCopy.users[crtIndex].others[payer] -= sumToAdd
            }
            else{
                billCopy.users[payerIndex].others[key] += sumToAdd - billCopy.users[crtIndex].others[payer]
                billCopy.users[crtIndex].others[payer] = 0
            }
        }
        setBill(billCopy)
        Keyboard.dismiss()
        let allBills = await AsyncStorage.getItem('bills')
        allBills = JSON.parse(allBills)
        let billIndex = allBills.findIndex(obj=>obj.name===item.name)
        allBills[billIndex] = bill
        allBills = JSON.stringify(allBills)
        await AsyncStorage.setItem('bills',allBills)
        setPickedValue('')
        setText('')

    }
    return (
        <ScrollView  contentContainerStyle={styles.container}>
            {bill.users.map((user,index)=>{
                return <BillUser open={open} setOpen={setOpen} user={user} key={index}></BillUser>
            })}
            <View style={styles.input}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Select who pays',
                        value:''
                    }}
                    value={pickedValue}
                    onValueChange={(value) => setPickedValue(value)}
                    items={picker}
                />
                <TextInput value={text} onChangeText={(text)=>{
                    setText(text)
                }} style={styles.textinput} />
                <Button onPress={addToBill} title='Add' />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        // justifyContent: 'center',
        alignItems:'center',
        color:'#c7c7c7',
        paddingBottom:400,
        // borderWidth:2,
        // borderColor:'black',
    },
    input:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center',
        marginTop:20,
        padding:10,
        minWidth:'80%',
        borderWidth:2,
        borderColor:'black',
    },
    textinput:{
        maxWidth:'20%',
        borderRadius:20,
        padding:10,
        minHeight:40,
        backgroundColor: 'white',
        flexGrow:1
    },
})
