const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const LoginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})


const LoginModel = mongoose.model('Login', LoginSchema)


class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }

  async logUser() {
    this.validate()

    if (this.errors.length > 0) return

    this.user = await LoginModel.findOne({ email: this.body.email })

    if (!this.user) {
      this.errors.push("User doesn't exist")
      return
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Invalid password')
      this.user = null
      return
    }
  }

  
  async register() {
    this.validate()

    if (this.errors.length > 0) return

    await this.userExists()

    if (this.errors.length > 0) return

    const salt = bcrypt.genSaltSync()
    this.body.password = bcrypt.hashSync(this.body.password, salt)

    this.user = await LoginModel.create(this.body)
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email })

    if (this.user) this.errors.push('User already exists')
  }

  validate() {
    this.cleanUp()

    if (!validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail')

    if (this.body.password < 4 || this.body.password > 30) this.errors.push('Invalid Password')
  }


  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login

