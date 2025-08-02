import session from "express-session";

function sessionLayer() {
    return session({
        secret: 'suraj-kashyap-05',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 } //1 hour time
    })
}
export function checkValidation(req, res, next) {
    // console.log(req.session)
    if (req.session.isAuthenticated) {
        // console.log("true")
        return next();
    }else{
    return res.redirect('/auth/login')
    }
}
export function isAdmin(req, res, next) {
    // console.log(req.session)
    if (req.session.role == 'admin') {
        console.log('admin')
        return next();
    }
    return res.status(401).json({ err: 'unauthorized access' })
}
export function isTeacher(req, res, next) {
    if (req.session.role == 'teacher') {
        return next();
    }
    return res.status(401).json({ err: 'unauthorized access' })
}
export default sessionLayer;