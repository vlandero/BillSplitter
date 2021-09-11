import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Create({nav}) {
    
    return (
        <TouchableOpacity onPress={()=>{
            nav.navigate('Create');
        }} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.plus}>
                    <Text style={styles.plustext}>+</Text>
                </View>
                <Text style={styles.create}>Create</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        minWidth:'90%',
        height:100,
        backgroundColor:'#ff675c',
        marginTop:35,
        borderRadius:40,
        justifyContent:'center'
    },
    content:{
        marginLeft:40,
        flexDirection:'row'
    },
    plus:{
        minWidth:34,
        minHeight:34,
        borderRadius:17,
        borderColor:'green',
        borderWidth:3,
        justifyContent:'center',
        alignItems:'center'
    },
    plustext:{
        fontSize:25
    },
    create:{
        marginLeft:20,
        fontSize:25
    }

})
