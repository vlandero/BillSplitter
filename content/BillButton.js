import React,{useEffect} from 'react'
import {TouchableOpacity, StyleSheet, Text, View,Alert } from 'react-native'

export default function BillButton({item,nav,deletee}) {
    
    return (
        <TouchableOpacity onPress={()=>{
            nav.navigate('BillPage',{
                item:item
            });
        }} style={styles.container}
        onLongPress={()=>{
            Alert.alert("Delete","Are you sure you want to delete "+item.name+" bill?",[{text:'Delete',onPress:()=>{return deletee(item.name)}},{text:"Cancel"}]);
        }}>
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
        flexDirection:'row',
        justifyContent: 'space-between',
        marginRight:40
    },
    create:{
        marginLeft:20,
        fontSize:25
    },
    XButton:{
        color:'red'
    }

})
