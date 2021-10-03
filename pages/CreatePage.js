import React,{useState} from 'react'
import { StyleSheet, Text, View,ScrollView, TextInput, Button, TouchableOpacity, AsyncStorageStatic, AsyncStorage } from 'react-native'



function Submit({isOpen,name,users,nav}) {
    if(!isOpen)
        return null
    return (
        <Button onPress={async ()=>{
            
            objArr = []
            for(i of users){
                let others = users.filter(item=>item!==i)
                let person = {
                    name:i,
                    others:{}
                }
                for(j of others){
                    person.others[j]=0
                }
                objArr=[...objArr,person]
            }
            let temp = await AsyncStorage.getItem('bills')
            temp=JSON.parse(temp)
            if(!temp){
                temp=[]
            }
            newBill = {
                name:name,
                users: objArr,
                indexNumber: temp.length===0?0:temp[temp.length - 1] + 1
            }
            temp=[...temp,newBill]
            await AsyncStorage.setItem('bills', JSON.stringify(temp))
            nav.navigate('Home');
        }} title='create'></Button>
    )
}


export default function CreatePage({navigation}) {
    const [current,setCurrent]=useState('');
    const [name,setName]=useState('');
    const [users,setUsers]=useState([])
    return (
        <View style={{flex:1,backgroundColor:'#c7c7c7'}}>
            <Text style={styles.intro}>Make sure to name your people differently</Text>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.choose}>Bill name</Text>
                <TextInput value={name} onChangeText={text=>setName(text)} style={styles.textInputName}></TextInput>
                <Text style={styles.choose}>Choose the participants for the bill</Text>
                
                <View style={styles.addUser}>
                    <TextInput value={current} onChangeText={text=>setCurrent(text)} style={styles.textInput}></TextInput>
                    <Button title='add' onPress={()=>{
                        if(current)
                            setUsers([...users,current])
                        setCurrent('')
                    }}></Button>
                </View>
                <View style={styles.users}>
                    {users.map((item,index)=>{
                        return(
                            <View style={styles.userAdded} key={index}>
                                <Text style={styles.username}>{item}</Text>
                                <TouchableOpacity onPress={()=>{
                                    let usersCopy = [...users]
                                    usersCopy.splice(index,1)
                                    setUsers(usersCopy)
                                }} style={styles.Xbutton}>
                                    <Text style={styles.x}>X</Text>
                                </TouchableOpacity>
                                
                            </View>
                        )
                    })}
                </View>
                <Submit nav={navigation} name={name} users={users} isOpen={users.length!==0}></Submit>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        alignItems: 'center',
        backgroundColor:'#c7c7c7',
        flexGrow:1,
        paddingBottom:70
    },
    choose:{
        marginTop:40,
        fontSize:25,
        color:'#800000'
    },
    textInput:{
        minWidth:'75%',
        minHeight:40,
        backgroundColor: 'white',
        borderRadius:20,
        padding:12,
    },
    textInputName:{
        minWidth:'75%',
        minHeight:40,
        backgroundColor: '#ffc3bf',
        borderRadius:20,
        padding:12,
        marginTop:20
    },
    addUser:{
        flexDirection:'row',
        marginTop:30
    },
    users:{
        marginTop:30,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    userAdded:{
        marginTop:15,
        minWidth:'60%',
        padding: 14,
        backgroundColor:'orange',
        minHeight:50,
        flexDirection:'row',
        justifyContent: 'space-between',
        borderRadius:30,
        
    },
    username:{
        fontSize:20,
        flexGrow:1
    },
    intro:{
        marginLeft:20,
        marginRight:20,
        textAlign:'center',
        fontSize:20
    },
    x:{
        fontSize:20
    }
    
})
