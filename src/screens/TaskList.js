import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';

import Task from '../components/Task';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/today.jpg';

import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

export default class TaskList extends Component{

    state = {
        showDoneTasks: true,
        visibleTasks: [],
        tasks: [{
            id: 1,
            desc: 'Implementar Projeto LL',
            estimateAt: new Date(),
            doneAt: new Date()
        },{
            id: 2,
            desc: 'Estudar Inglês',
            estimateAt: new Date(),
            doneAt: null
        },{
            id: 8,
            desc: 'Estudar Inglês',
            estimateAt: new Date(),
            doneAt: null
        }]
    }

    componentDidMount = () => {
        this.filterTasks();
    }

    toggleFilter = ()=>{
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
    }
    filterTasks = ()=>{
        let visibleTasks = null;
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks];
        } else{
            const pending = task => task.doneAt === null;
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks});
    }
    toggleTask = taskId =>{
        const tasks = [...this.state.tasks];
        tasks.forEach(task =>{
            if(task.id === taskId){
                task.doneAt = task.doneAt? null : new Date();
            }
        });
        this.setState({ tasks }, this.filterTasks);
    }
    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye': 'eye-slash'} 
                            size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                   <FlatList data={this.state.visibleTasks}
                   renderItem={({item})=>(<Task {...item} toggleTask={this.toggleTask}/>)}
                   keyExtractor={item => item.id.toString() }/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background:{
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar:{
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios'? 40 : 10
    }
});