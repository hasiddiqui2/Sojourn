import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from "react-native";
import { UserNameContext } from "../MainContainer";
import CircularProgress from "react-native-circular-progress-indicator";
import Ionicons from 'react-native-vector-icons/Ionicons';

// console.log(UserNameContext);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ProfileScreen({ route, navigation }) {
    const username = React.useContext(UserNameContext);
    // console.log(username);
    //alert(username); 
    // https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg some default person pic
    return (
        <View >
            {/* Chunk of color on top above all elements */}
            <View style={styles.header}></View>
            
            {/* Level/Progress with Icon and Username Displayed */}
            <View style = {{flexDirection:"row"}}>
                <View style = {{marginLeft:"5%", flex:4, marginBottom:"5%"}}>
                    <CircularProgress
                    value = {100} 
                    style = {styles.progressBar} 
                    radius = {windowWidth*.215} 
                    activeStrokeWidth = {windowWidth*.05}
                    // inActiveStrokeWidth = {10}
                    // inActiveStrokeColor = {"grey"}
                    inActiveStrokeOpacity = {0}
                    showProgressValue = {false}
                    />
                    <Image style={styles.avatar} source={{uri: 'https://external-preview.redd.it/rnXjiMV7IreZzyuNoOjQHT8SeqDl1rUOvefO_79SRDo.jpg?width=640&crop=smart&auto=webp&s=951482ad059a0c34da568289fa34a7fd1e9fc171'}}/>
                </View>

                {/* Display Username */}
                <View style = {{flex:2.5, paddingTop:"13.5%"}}>
                    <Text style = {{fontSize:20, fontWeight:"bold"}}>
                        {username}                                            
                    </Text>
                </View>

                {/* Settings */}
                <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen",{username:username})} style = {{flex:1.25,height:"30%"}}>
                    <Ionicons name={"settings"} size={35} color={"black"}/>
                </TouchableOpacity>
            </View>

            {/* Badges */}
            <View style = {{borderColor:"blue",borderWidth:5,height:windowHeight*.35, width:windowWidth*.9, marginLeft:"5%", marginBottom:"5%"}}>
                    <Text style = {{fontSize:25, fontWeight:"bold"}}>
                        Badges, not implemented yet until xp system done first
                    </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#0000FF",
    height:windowHeight*.2,
    marginBottom: "5%",
    marginTop:"7%"
  },
  progressBar:{
    position:"absolute",
  },
  avatar: {
    width: windowWidth*.3,
    height: windowWidth*.3,
    borderRadius: 1000, //if this is too small (<100 apparently), can make the circle became oval ish 
    borderWidth: 5,
    borderColor: "grey",
    marginTop:windowWidth*.065,
    marginLeft:windowWidth*.065,
    position: 'absolute',
  },
  
});