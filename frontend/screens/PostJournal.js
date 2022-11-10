import * as React from "react";
import { FlatList, View, Text, StyleSheet, Button, Switch, TextInput, Alert } from "react-native";
import { UserNameContext } from "../MainContainer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from "axios";

let boxWidth = "90%"

export default function JournalScreen({ navigation }) {
    const username = React.useContext(UserNameContext);
    let [switchVal, setSwitchVal] = React.useState(false);
    let [locationVal, setLocationVal] = React.useState("");
    let [descriptionVal, setDescriptionVal] = React.useState("");
    let [newPost, setNewPost] = React.useState(0); 
    let dropDownData = ["Statue of Liberty", "Central Park", "Empire State Building", "World Trade Center"];


    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: "15%"}}>
            {/* Location Entry */}
            <View style = {styles.locationEntryRec}>
                <Ionicons name={"md-location-outline"} size={23} style = {styles.locationIcon}  />
                {/* <Text style = {styles.locationEntryText}> 
                    User would be able to enter the location here 
                </Text> */}
                <ModalDropdown
                    // ref={dropdown}
                    style={{ width: '100%' }}
                    defaultValue="Choose a location..."
                    textStyle={{paddingTop: "1%",paddingLeft:"5%", fontSize: 16}}
                    showsVerticalScrollIndicator={false}
                    options= {dropDownData}
                    onSelect={(e)=>{
                        setLocationVal(dropDownData[e]);
                    }}
                    dropdownStyle={{
                        marginTop: 0.5,
                        width: '90%',
                        borderRadius: 10,
                        borderWidth: 0,
                        elevation: 3,
                        overflow: 'hidden',
                    }}
                    dropdownTextStyle={{paddingLeft:"5%",fontSize:16}}
                >
                </ModalDropdown>

            </View>
            {/* Entry Writing Space */}
            <View style = {styles.journalWriteRec}>                
                <TextInput 
                   style = {styles.locationEntryText}
                   onChangeText = {(e)=>{setDescriptionVal(e)}} 
                   multiline = {true} 
                   textAlignVertical = {"top"}
                   numberOfLines = {6}
                >
                </TextInput>

                <View style = {styles.publicPrivateSwitch}>
                    <Switch 
                        trackColor={{false:"grey",true:"black"}} 
                        thumbColor = {"black"} 
                        value = {switchVal}
                        onValueChange = {(value) => setSwitchVal(value)}
                    >
                    </Switch>
                    <Text style = {{paddingTop:"13%", fontSize: 14}}>
                        Private
                    </Text>
                </View>    
            </View>
            {/* Post Button */}
            <View style = {styles.postButton}> 
                <Button 
                    title = "Post" 
                    onPress={() => 
                        axios.post( "https://sojourn-user-auth.herokuapp.com/api/journal" ,
                            {
                                username: 'testing123',
                                locationName: locationVal,
                                description: descriptionVal,
                                privateEntry: switchVal
                            }
                        )    
                        .then(
                            (response) => {
                                // console.log(response.data); // Json of the newly added json to collection    
                                alert("Journal Has Been Posted!");
                                setNewPost(newPost+1);
                            }
                        ) 
                        .catch(
                            (response) => {
                                alert(response.response.data);
                            }
                        )
                    } 
                    color = "black"
                >
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        locationEntryRec: {
            width: boxWidth,
            height: "4.5%",
            borderColor: "black",
            borderWidth: 1,
            marginTop: 50,
            flexDirection: "row",
        },
        locationEntryText:{
            textAlign: "left",
            width: "100%",
            height: "155%",
            marginBottom: '-30%',
            paddingRight:"2%",
            fontSize: 14
        },
        locationIcon:{
            width: "8%",
            flex: 1,
            paddingTop: 1
        },
        journalWriteRec:
        {
            width: boxWidth,
            height: "20%",
            borderColor: "black",
            borderWidth: 1,
            paddingLeft: "2.5%",
            marginBottom: "2.5%",
            paddingBottom: "3%"
        },
        journalHistoryRec:
        {
            width: boxWidth,
            height: "50%",
            marginTop: "10%"
        },
        publicPrivateSwitch:{
            paddingLeft:"70%",
            paddingTop:"1%",
            flexDirection:"row"
        },
        postButton:{
            paddingLeft:"70%",
            width: "90%"
        },
        journalSeparator:{
            paddingBottom:"10%"
        },
        journalEntryLocation:{
            fontSize:17,
            fontFamily: "Arial",
            fontWeight: "bold",
        },
        journalEntryDescription:{
            fontFamily: "Arial",
            fontSize:17
        }
    }
)