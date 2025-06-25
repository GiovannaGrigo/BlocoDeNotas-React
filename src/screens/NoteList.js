import { View, StyleSheet, FlatList } from "react-native"
import { useState, useEffect} from "react";
import Note from "../components/Note";

const noteDB = [
    {
        id: Math.random(),
        title: "Lembrete doméstico",
        desc: 'Dar banho no cachorro',
        doneAt: new Date()
    },
    {
        id: Math.random(),
        title: "Lembrete frequente",
        desc: 'Guardar o mouse na bolsa',
        doneAt: new Date()
    },
    {
        id: Math.random(),
        title: "Lembrete Mercado",
        desc: 'Comprar alface no Jaú Serve',
        doneAt: null
    }
]

export default function NoteList() {
    const [notes, setNotes] = useState(noteDB)
    const [contador, setContador] = useState(0)
    const [showDoneNotes, setShowDoneNotes] = useState(true)
    
    const deleteNote = id => {
        const tempNotes = notes.filter(note => note.id !== id)
        setNotes(tempNotes)
    }
    useEffect(() => {
        
    }, notes)

    const toggleNote = noteId => {
        const noteList = [...notes]
        noteList.forEach(note => {
            if (note.id === noteId) {
                note.doneAt = note.doneAt ? null : new Date()
            }
        });
        setNotes(noteList)
    }

    return (
        <View style={styles.container}>
            <View style={styles.noteList}>
                <FlatList
                    data={notes}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Note {...item} onToggleNote={toggleNote} onDelete={deleteNote} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        display:"flex",
        justifyContent: "center"
    },

    noteList: {
        flex:0.9,
        backgroundColor: "white"
    }
})