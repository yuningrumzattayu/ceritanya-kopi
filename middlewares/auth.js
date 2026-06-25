function isLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  next();
}

function isAdmin(req, res, next) {
  if (req.session.role !== "Admin") {
    return res.redirect("/menus");
  }

  next();
}

module.exports = {
  isLogin,
  isAdmin
};
