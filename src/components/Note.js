import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import moment from 'moment-timezone'
import 'moment/locale/pt-br'

import Icon from "react-native-vector-icons/FontAwesome"
import { Swipeable } from 'react-native-gesture-handler'

export default props => {

    const date = props.doneAt ? props.doneAt : null
    var formattedDate = null
    if(date != null){
        formattedDate = moment(date).tz('America/Sao_Paulo').locale('pt-br').format('ddd, D [de] MMMM');
    }

    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : {}

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name='trash' size={30} color='#fff' />
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleNote(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.title}</Text>
                    <Text style={styles.desc}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#fff' />
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      borderColor: '#AAA',
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#FFF' 
  },
  checkContainer: {
      width: '20%',
      alignContent: 'center',
      alignItems: 'center'
  },
  pending: {
      height: 25,
      width: 25,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: '#555'
  },
  done: {
      height: 25,
      width: 25,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: '#555',
      backgroundColor: 'rgb(85, 177, 57)',
      alignItems: 'center',
      justifyContent: 'center'
  },
  desc: {
      color: "rgb(0,0,0)",
      fontSize: 15
  },
  date: {
      color: '#555',
      fontSize: 12
  },
  right: {
      backgroundColor: 'red',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 20
  }
})
