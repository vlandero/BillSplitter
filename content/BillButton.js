import React,{useEffect} from 'react'
import {TouchableOpacity, StyleSheet, Text, View } from 'react-native'

export default function BillButton({item,nav}) {
    return (
        <TouchableOpacity onPress={()=>{
            nav.navigate('BillPage',{
                item:item
            });
        }} style={styles.container}>
            <View style={styles.content}>
                
                <Text style={styles.create}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        minWidth:'90%',
        height:100,
        backgroundColor:'white',
        marginTop:35,
        borderRadius:40,
        justifyContent:'center'
    },
    content:{
        marginLeft:40,
        flexDirection:'row'
    },
    create:{
        marginLeft:20,
        fontSize:25
    }

})
