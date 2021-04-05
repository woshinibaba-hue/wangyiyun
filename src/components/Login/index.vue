<template>
  <div class="loginBox">
    <div class="title">
      <span>登录</span>
      <span class="close" @click="close">×</span>
    </div>
    <div class="phoneLogin" v-if="isShow">
      <div class="platform">
        <img src="../../assets/images/platform.png" alt="" />
      </div>
      <div class="button">
        <button class="phone" @click="phoneLogin">手机号登录</button><br />
        <button class="forget">忘记密码</button>
      </div>
      <div class="clause">
        <input type="checkbox" id="clause" :checked="isCheck" @click="check" />
        <label for="clause">同意</label>
        <span>《服务条款》《隐私政策》《儿童隐私政策》</span>
      </div>
    </div>
    <div class="loginInp" v-else>
      <div class="top">
        <input type="text" placeholder="请输入手机号" class="phoneInp" v-model="loginInfo.phone" /><br />
        <input type="password" placeholder="请输入密码" class="pwd" v-model="loginInfo.password" /><br />
        <button @click="login" class="login">登录</button>
      </div>
      <div class="floor">
        <span class="toggle" @click="toggle">&lt;切换登录方式</span>
        <span class="closePwd">忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      isCheck: false,
      isShow: true,
      loginInfo: {
        phone: '',
        password: ''
      }
    }
  },
  mounted() {
    let title = document.querySelector('.title')
    let loginBox = document.querySelector('.loginBox')
    let that = this
    title.addEventListener('mousedown', e => {
      this.x = e.pageX - loginBox.offsetLeft
      this.y = e.pageY - loginBox.offsetTop
      title.addEventListener('mouseup', () => {
        title.removeEventListener('mousemove', move)
      })
      title.addEventListener('mousemove', move)
    })
    function move(e) {
      loginBox.style.left = e.pageX - that.x + 'px'
      loginBox.style.top = e.pageY - that.y + 'px'
    }
  },
  methods: {
    close() {
      this.$emit('show', false)
    },
    check(e) {
      this.isCheck = e.target.checked
    },
    phoneLogin() {
      if (!this.isCheck) {
        this.showMessage('警告哦，请同意《服务条款》《隐私政策》《儿童隐私政策》')
        return
      }
      this.isShow = false
    },
    toggle() {
      this.isShow = true
    },
    async login() {
      if (this.loginInfo.phone.trim() == '') {
        this.showMessage('手机号不能为空')
        return
      } else if (this.loginInfo.password.trim() == '') {
        this.showMessage('密码不能为空')
        return
      }
      const res = await this.$http.get('/login/cellphone', {
        params: {
          phone: this.loginInfo.phone,
          password: this.loginInfo.password
        }
      })
      if (res.code !== 200) {
        this.showMessage('账号或密码错误', 'error')
      } else {
        this.showMessage('登录成功', 'success')
        this.$emit('show', false)
        this.$store.commit('SetUserInfo', res)
      }
    },
    // 弹窗消息
    showMessage(message, type = 'warning') {
      this.$message({
        message,
        type
      })
    }
  }
}
</script>

<style scoped>
.loginBox {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 300px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 1px 1px 9px -2px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
  font-weight: 700;
  padding: 8px 20px;
  background-color: #2d2d2d;
  cursor: move;
  margin-bottom: 10px;
}
.close {
  margin-right: 30px;
  font-size: 20px;
  cursor: pointer;
}
.phoneLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.platform img {
  width: 150px;
}
button {
  width: 200px;
  padding: 5px 0;
  border: 0;
  outline-style: none;
  cursor: pointer;
  margin-top: 5px;
  border-radius: 5px;
}
.phone {
  background-color: #3584cf;
  color: #fff;
}
.clause {
  margin-top: 10px;
}
.loginInp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pwd,
.phoneInp {
  width: 170px;
  margin: 15px;
  border: 0;
  border: 1px solid #000;
  padding: 5px 15px;
  border-radius: 10px;
  outline-style: none;
}
.login {
  background-color: #3584cf;
  color: #fff;
  margin: 15px;
}
.floor {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.floor span {
  margin: 10px 50px;
}
.toggle {
  color: #3584cf;
}
</style>
