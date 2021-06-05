exports.checkForErrors = (err, req, res, next) => {
    if (err) {
        return res.render('error')
    }

    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()

    next()
}

exports.messagesMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}

exports.requireLogin = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'You need to log in')
        req.session.save( () => res.redirect('/'))
        return
    }

    next()
}