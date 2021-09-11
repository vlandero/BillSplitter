import React,{useEffect, useState} from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import BillUser from '../content/BillUser'
import RNPickerSelect from "react-native-picker-select";

export default function BillPage({route ,navigation}) {
    const {item} = route.params
    const [open,setOpen] = useState('')
    const [pickedValue,setPickedValue]=useState('')
    const [text,setText] = useState('')
    useEffect(()=>{
        navigation.setOptions({headerTitle:item.name})
        
    },[])
    const picker = []
    item.users.forEach((x)=>{
        picker.push({
            label:x.name,
            value:x.name
        })
    })
    return (
        <View style={styles.container}>
            {item.users.map((user,index)=>{
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
                <Button title='Add' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent: 'center',
        alignItems:'center',
        color:'#c7c7c7',
    },
    input:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop:20,
        padding:10,
        minWidth:'80%'
    },
    textinput:{
        minWidth:'20%',
        borderRadius:20,
        padding:10,
        minHeight:40,
        backgroundColor: 'white',
    }
})
