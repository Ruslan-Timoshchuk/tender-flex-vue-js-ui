import { defineStore } from 'pinia'
import { authenticate } from '@/services/authentication.api';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),

    getters: {
        id: (state) => {
            if (state.user && state.user.id !== null) {
                return state.user.userId
            } else {
                return null;
            }
        },
        authorities: (state) => {
            if (state.user && Array.isArray(state.user.authorities)) {
                return state.user.authorities;
            } else {
                return [];
            }
        }
    },

    actions: {
        async authenticate(authenticationRequest) {
            this.user = await authenticate(authenticationRequest);
        },

        clearUser() {
            this.user = null
        },
    },

})