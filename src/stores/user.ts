import { defineStore } from 'pinia'
import axios from "axios";
import type {userInterface} from "@/types/user.ts";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: <userInterface>{
            id: -1,
            email: '',
        },
    }),
    actions: {
        async login(email: string, password: string) : Promise<string> {
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + '/api/auth', {
                    email,
                    password
                }, {headers: {
                    "Content-Type": "application/json"
                    }})

                if (response.status === 200) {
                    localStorage.setItem('token', response.data.accessToken)
                    await this.auth()
                    return ''
                }
                else {
                    return 'Ошибка. Попробуйте позже.'
                }

            } catch (e: any) {
                //alert(e.response.data.message)
                console.log(e)
                if (e.response.status === 404) {
                    return 'Пользователь с таким логином не найден.'
                }
                else {
                    return e.response.data.message[0]
                }
            }
        },
        async auth() : Promise<void> {
            try {
                const token = localStorage.getItem('token')
                if (token === 'undefined' || token === null) return
                const response = await axios.get(import.meta.env.VITE_API_URL + '/api/auth',
                    {headers: {Authorization: 'Bearer ' + token}})

                if (response.status === 200) {
                    this.user = response.data
                }
                else {
                    this.user = {
                        id: -1,
                        email: ''
                    }
                }

            } catch (e: any) {
                console.log(e)
                alert(e.response.data.message)
                localStorage.removeItem('token')
            }
        },
        async registration(email:string, password:string, confirm_password:string) : Promise<string> {
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + '/api/reg', {
                    email,
                    password,
                    confirm_password
                }, {headers: {
                    "Content-Type": "application/json"
                }})

                if (response.status === 200) return '';
                else return 'Ошибка. Попробуйте позже.';

            } catch (e: any) {
                console.log(e)
                if (e.response.status === 409) {
                    return 'Пользователь с таким e-mail уже зарегистрирован.';
                }
                else {
                    return e.response.data.message[0];
                }
            }
        },
        logout() : void {
            localStorage.removeItem('token')
            this.user = {
                id: -1,
                email: '',
            }
        }
    },
});
