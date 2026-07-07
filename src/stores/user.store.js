import { defineStore } from 'pinia'
import { authenticate, loadAuthenticationState } from '@/services/authentication.api';

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
        },
        isAdministrator() {
            return this.hasAuthority('ADMINISTRATOR');
        },
        isContractor() {
            return this.hasAuthority('CONTRACTOR');
        },
        isBidder() {
            return this.hasAuthority('BIDDER');
        },
    },

    actions: {
        async authenticate(authenticationRequest) {
            this.user = await authenticate(authenticationRequest);
        },

        async loadAuthenticationState() {
            try {
                this.user = await loadAuthenticationState();
            } catch (error) {
                this.user = null
            }
        },

        clearUser() {
            this.user = null
        },
        
        hasAuthority(name) {
            return this.user.authorities.some(authoriry => authoriry.name === name)
        }
    },

})