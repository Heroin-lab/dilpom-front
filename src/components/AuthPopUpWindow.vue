<template>
 <div @click="closePopUp" class="auth-popup">
   <div class="auth-popup__form" id="popup-form">
     <span @click="closePopUp" class="auth-popup__cross">+</span>
     <h2 id="form-header">Вхід</h2>
     <input id="phoneNumber" placeholder="Номер телефону">
     <input v-if="regMode" id="firstName" placeholder="Ім'я">
     <input v-if="regMode" id="secondName" placeholder="Призвище">
     <input v-if="regMode" id="patronymic" placeholder="По батькові">
     <input id="password" placeholder="Пароль" type="password">
     <input class="auth-popup__form_confirm-pass" id="confirm-password" placeholder="підтвердити пароль" type="password">
     <a class="auth-popup__form_forgot-pass" id="forgot-pass" href="#">Забув пароль?</a>
     <button @click="authValidator" id="main-btn" value="Login">Увійти</button>

     <div class="auth-popup__form_footer">
       <h6 id="alert-msg"></h6>
       <span id="prefixMsg">Не має обліковогу запису?</span> <a id="hrefMsg" @click="changeAuthMode" href="#">Реєстрація</a>
       <p>{{ authStatus }}</p>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: "AuthPopUpWindow",
  data () {
    return {
      authStatus: false,
      regMode: false,
    }
  },

  methods: {
    closePopUp () {
      const popup = document.querySelector('.auth-popup');

      document.onclick = function(e){
        if ( e.target.className === 'auth-popup' || e.target.className === "auth-popup__cross") {
          popup.style.display = 'none';
        }
      };
    },

    changeAuthMode () {
      let formHeader = document.getElementById("form-header")
      let confirmInput = document.getElementById("confirm-password")
      let forgotPassHref = document.getElementById("forgot-pass")
      let mainButton = document.getElementById("main-btn")
      let popupForm = document.getElementById("popup-form")
      let prefixMsg = document.getElementById("prefixMsg")
      let hrefMsg = document.getElementById("hrefMsg")



      if (mainButton.value === "Login") {
        this.regMode = true
        formHeader.innerText = "Реєстрація"
        mainButton.innerText = "Зареєструватись"
        mainButton.value = "Sign Up"
        mainButton.style.backgroundColor = "#00bcff"
        popupForm.style.height = "690px"
        prefixMsg.innerText = "Вже є обліковий запис?"
        hrefMsg.innerText = "Увійти"

        forgotPassHref.style.display = "none"
        confirmInput.style.display = "block"

      } else {
        this.regMode = false
        formHeader.innerText = "Вхід"
        mainButton.innerText = "Увійти"
        mainButton.value = "Login"
        mainButton.style.backgroundColor = "#ff004e"
        popupForm.style.height = "500px"
        prefixMsg.innerText = "Don`t have an account?"
        hrefMsg.innerText = "Sign Up"

        forgotPassHref.style.display = "block"
        confirmInput.style.display = "none"

      }

      confirmInput.value = ""
      document.getElementById("email").value = ""
      document.getElementById("password").value = ""
    },

    authValidator () {
      // let emailInput = document.getElementById("email").value
      // let passInput = document.getElementById("password").value
      // let mainButton = document.getElementById("main-btn").value


      // if (!emailInput) {
      //   this.alertMaker("Email field is empty!")
      //   return
      // } else if (emailInput.length < 3) {
      //   this.alertMaker("Your email address is too short!")
      //   return
      // } else if (!/[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(emailInput)) {
      //   this.alertMaker("Please input correct email address!")
      //   return
      // }


      // if (!passInput) {
      //   this.alertMaker("Password field is empty!")
      //   return
      // } else if (passInput.length < 6) {
      //   this.alertMaker("Your password is too short!")
      //   return
      // }
      //
      // if (mainButton != "Login" && !confirmPassInput) {
      //   this.alertMaker("Confirm your password!")
      //   return
      // }
      //
      // if (mainButton != "Login" && passInput != document.getElementById("confirm-password").value) {
      //   this.alertMaker("Passwords don't match!")
      //   return;
      // }


      this.authRequest()
    },

    alertMaker (alertStr) {
      let alertBlock = document.getElementById("alert-msg")

      alertBlock.innerText = alertStr
      setTimeout(() => {
        alertBlock.innerText = ""
      }, 10000)
    },

    async authRequest () {
      let phoneNumber = document.getElementById("phoneNumber").value
      let password = document.getElementById("password").value
      let mainButton = document.getElementById("main-btn").value

      if (mainButton == "Sign Up") {
        var name = document.getElementById("firstName").value
        var secName = document.getElementById("secondName").value
        var prima = document.getElementById("patronymic").value
      }

      document.getElementById("alert-msg").innerText = ""

      if (mainButton == "Login") {
        await this.$store.dispatch("doLogin", {userPhoneNumber: phoneNumber, userPassword: password})
        this.getAuthStatus()
        // await this.$store.dispatch('getAllUserOffensesByUserId', {userId: localStorage.getItem("user_id")})
        this.$router.go()
      } else {
        await this.$store.dispatch("doRegister", {userPhoneNumber: phoneNumber, name: name, secName: secName, prima: prima, userPassword: password})
        this.changeAuthMode()
      }
      // Можно хранить в стейте роль пользователя чтобы выдавать админ права
    },

    getAuthStatus () {
      if (this.$store.getters.getUserAuthStatus === true) {
        this.authStatus = true
        this.$emit('changeParentAuthStatus')
        document.getElementById("phoneNumber").value = ""
        document.getElementById("password").value = ""
        document.querySelector('.auth-popup').style.display = "none"
      } else {
        this.alertMaker("Wrong Email or Password!")
      }
    }
  },

}
</script>

<style lang="scss" scoped>

  .auth-popup {
    display: none;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.77);
    z-index: 1000;

    &__cross {
      position: relative;
      font-size: 37px;
      text-align: center;
      margin: 10px -355px 0 0;
      color: #000418;
      transform: rotate(45deg);
      cursor: pointer;

      height: 43px;
      width: 43px;
      border-radius: 50%;

      &:hover {
        transition: 0.5s;
        background-color: #9a9a9a;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;

      margin-top: 200px;
      height: 500px;
      width: 415px;
      background-color: white;
      border-radius: 7px;

      & h2 {
        margin: 0 0 25px 0;
        font-size: 36px;
        text-transform: uppercase;
        font-family: Gilroy;
      }

      & input {
        height: 55px;
        width: 314px;
        margin-bottom: 13px;
        padding-left: 10px;

        border: transparent;
        border-radius: 7px;
        box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.40);

        font-size: 17px;
        font-family: Gilroy, sans-serif;
      }

      & input:focus{
        outline: 1px solid #000418;
      }

      & ::placeholder {
        letter-spacing: 1px;
        text-transform: uppercase;
        font-family: Gilroy, sans-serif;
        font-weight: bold;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.40);
      }

      &_confirm-pass {
        display: none;
      }

      &_forgot-pass {
        display: block;
        padding-top: 5px;
        width: 326px;
        text-align: left;
        font-family: Gilroy;
      }

      & button {
        display: block;
        margin-top: 30px;
        height: 55px;
        width: 326px;
        background-color: #ff004e;
        border: transparent;
        border-radius: 7px;

        text-transform: uppercase;
        font-family: Gilroy;
        font-size: 22px;
        font-weight: bold;
        color: white;
        cursor: pointer;
        box-shadow: 0px 3px 15px 2px rgba(0, 0, 0, 0.4);
      }

      & button:active {
        transform: scale(0.99);
        box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.3);
      }

      &_footer {
        margin-top: 30px;
        text-align: center;

        & h6 {
          height: 25px;
          margin-bottom: 20px;

          color: red;
          font-family: Gilroy;
          font-weight: normal;
          font-size: 20px;
        }

        & span, a {
          font-family: Gilroy;
        }

        & p {
          display: none;
        }
      }
    }
  }
</style>