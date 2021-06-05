const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if (req.session.user) return res.render('logged')
    res.render('login')
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body)
  
    await login.logUser()
  
    if (login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save( () => {
        res.redirect('back')
      })
      return
    }

    req.flash('success', "You're logged into the system")
    req.session.user = login.user
    req.session.save( () => {
      res.redirect('back')
    })
  } catch(e) {
    console.log(e);
    return res.render('error')
  }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}
