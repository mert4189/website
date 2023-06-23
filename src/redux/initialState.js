const storedUser = localStorage.getItem('user');
const storedRol = localStorage.getItem('rol');
const storedAd = localStorage.getItem('ad');
const storedAdmin = localStorage.getItem('admin');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  rol: storedRol ? JSON.parse(storedRol) : null,
  ad: storedAd ? JSON.parse(storedAd) : null,
  kullanıcı: storedAd ? JSON.parse(storedAd) : null,
  admin: storedAdmin ? JSON.parse(storedAdmin) : null,
};

export default initialState;
