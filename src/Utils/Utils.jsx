import Cookies from 'js-cookie';

export function isUserLoggedIn() {
    return !!Cookies.get('token');  // Retorna true se o token existir, false caso contrário
}
