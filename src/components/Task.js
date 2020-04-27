import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyle from '../commonStyles';

export default props =>{
    const date = 
    moment((props.doneAt != null) ? props.doneAt : props.estimateAt).
                            locale('pt-br').format('ddd, D [de] MMMM');
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback
            onPress={()=> props.toggleTask(props.id)}
            >
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            
            <View>
                <Text style={[styles.desc, (props.doneAt!=null)?{textDecorationLine:'line-through'}:{}]}>{props.desc}</Text>
                <Text style={styles.date}>{date + ""}</Text>
            </View>
        </View>
    );
}

function getCheckView(doneAt){
    if(doneAt != null){
        return(
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF' />
            </View>
        );
    }else{
        return(
            <View style={styles.pending}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer:{
        width: '20%',
        alignItems: 'center'
    },
    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc:{
        fontFamily: commonStyle.fontFamily,
        color: commonStyle.colors.mainText,
        fontSize: 15
    },
    date:{
        fontFamily: commonStyle.fontFamily,
        color: commonStyle.colors.subText,
        fontSize: 12
    }
});