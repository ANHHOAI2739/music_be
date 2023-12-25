import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).json({
      message: 'Token is not provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({
        message: 'Token is expired',
      });
    }
    return res.status(401).json({
      message: 'Token is not valid',
    });
  }
};
export const isAdminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    console.log(req.user);
    if (req.user.isAdmin === true) {
      next();
    } else {
      res.status(403).json('Only admins can do this');
    }
  });
};
