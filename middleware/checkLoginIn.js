exports.checkLoginIn = function(req, res, next) {
  if(req.session.user){
    next();
  } else {
    const err = new Error("Not logged in!");
    next(err);
  }
}

