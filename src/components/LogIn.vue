<template>
  <div class="login">
    <v-container>
      <v-img contain height="80" src="@/assets/tender-flex-Logo.svg" style="margin-top: 12vh" />
      <v-container>
        <v-row justify="center">
          <v-card height="360" width="350" class="mt-10">
            <v-card-title class="text-center mt-6">Log in to proceed</v-card-title>
            <v-container class="px-8">
              <v-sheet class="mx-auto mt-3">
                <v-form v-model="isFormValid" fast-fail @submit.prevent="submit({ email, password })">
                  <v-alert v-if="exceptionAlert.isActivated" :text="exceptionAlert.message" type="error"
                    variant="outlined"></v-alert>
                  <div v-else>
                    <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
                    <v-text-field v-model="password" label="Password" :rules="passwordRules"
                      type="password"></v-text-field>
                    <v-btn :disabled="!isFormValid" type="submit" block class="mt-2" color="success">Log In</v-btn>
                  </div>
                </v-form>
              </v-sheet>
            </v-container>
          </v-card>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { exceptionAlert } from "@/components/alerts";
import { useUserStore } from "@/stores/user.store";
import router from "@/router/index";

export default {
  data: () => ({
    exceptionAlert,
    isAlertDialog: true,
    isFormValid: false,
    email: '',
    emailRules: [
      value => {
        if (value?.length >= 5) return true
        return 'Email must be at least 5 characters.'
      },
    ],
    password: '',
    passwordRules: [
      value => {
        if (value?.length >= 5) return true
        return 'Password must be at least 5 characters.'
      },
    ],
  }),

  methods: {
    async submit(authenticationRequest) {
      try {
        const userStore = useUserStore();
        await userStore.authenticate(authenticationRequest)
        router.push({
          name: "user-module"
        });
      } catch (error) {
        exceptionAlert.activateAlert(error)
      }
    }
  }
}
</script>
