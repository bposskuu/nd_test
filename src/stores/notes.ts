import {defineStore} from 'pinia'
import type {notesArray} from "@/types/notes.ts";
import axios from "axios";

export const useNotesStore = defineStore('notes', {
    state: () => ({
        notes: <notesArray[]>[],
    }),
    actions: {
        async getNotes(): Promise<void> {
            const token = localStorage.getItem('token')
            if (token === 'undefined' || token === null) return
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/api/notes',
                    {headers: {Authorization: 'Bearer ' + token}})

                this.notes = response.data
            } catch (e: any) {
                alert(e.response.data)
            }
        },
        async postNote(title: string, content: string): Promise<void> {
            const token = localStorage.getItem('token')
            if (token === 'undefined' || token === null) return
            try {
                await axios.post(import.meta.env.VITE_API_URL + '/api/notes', {
                        title,
                        content,
                    },
                    {headers: {Authorization: 'Bearer ' + token}})

                await this.getNotes()
            } catch (e: any) {
                alert(e.response.data)
            }
        },
        async deleteNote(id: number): Promise<void> {
            const token = localStorage.getItem('token')
            if (token === 'undefined' || token === null) return
            try {
                await axios.delete(import.meta.env.VITE_API_URL + '/api/notes/' + id,
                    {headers: {Authorization: 'Bearer ' + token}})

                await this.getNotes()
            } catch (e: any) {
                alert(e.response.data)
            }
        },
    }
});
