const Login = require('../models/LoginModel')


exports.index = (req, res) => {
  res.render('register')
}

exports.register = async (req, res) => {

  try {
    const login = new Login(req.body)
  
    await login.register()
  
    if (login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save( () => {
        res.redirect('back')
      })
      return
    }

    req.flash('success', 'User created')
    req.session.save( () => {
      res.redirect('back')
    })
  } catch(e) {
    console.log(e);
    return res.render('error')
  }
}