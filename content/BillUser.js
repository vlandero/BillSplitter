import React,{useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import InsetShadow from 'react-native-inset-shadow'

function Dropdown({userOpened,user}){
    if(userOpened!==user.name)
        return null
    let otherUsers = Object.keys(user.others)
    const textStyle = {
        color:'#5769c2'
    }
    return(
        <View style={styles.dropdownview}>
            {otherUsers.map((item,index)=>{
                return (
                    <View style={styles.others} key={index}>
                        <Text style={textStyle}>{item}</Text>
                        <Text style={textStyle}>{user.others[item]}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default function BillUser({user,open,setOpen}) {
    return (
        <View>
            <TouchableOpacity onPress={()=>{
                if(open===user.name)
                    return setOpen('')
                return setOpen(user.name)
            }} style={styles.container}>
                <Text style={styles.user}>{user.name}</Text>
            </TouchableOpacity>
            <InsetShadow containerStyle={{height:'auto'}}>
                <Dropdown user={user} userOpened={open}></Dropdown>
            </InsetShadow>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        minWidth:'70%',
        marginTop:20,
        minHeight:50,
        borderRadius:30,
        padding:10,
        justifyContent: 'center',
        borderColor:'black',
        borderWidth:2
    },
    user:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:10
    },
    dropdownview:{
        backgroundColor: 'white',
        minHeight:40,
    },
    others:{
        flexDirection:'row',
        justifyContent: 'space-between',
        padding:20
    }
})
