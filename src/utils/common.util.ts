import jwt from 'jsonwebtoken';

export function generateFilename() {
  const today = new Date();
  const logsname =
    today.toLocaleDateString().split('/').join('_') + '_access.log';
  return logsname;
}

export function generateToken(payload: any, secretKey: any) {
  const token = jwt.sign({ payload }, secretKey, { expiresIn: '1h' });
  return token;
}
