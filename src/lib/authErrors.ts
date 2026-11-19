export function getAuthErrorMessage(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code ?? '')
      : '';

  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no tiene un formato válido.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Las credenciales no son correctas. Revisa tu correo y contraseña.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Espera un momento antes de volver a probar.';
    case 'auth/user-disabled':
      return 'Esta cuenta está desactivada. Contacta con la persona administradora.';
    case 'auth/network-request-failed':
      return 'No hay conexión con Firebase. Revisa tu red e inténtalo otra vez.';
    case 'auth/operation-not-allowed':
      return 'El acceso con correo y contraseña no está habilitado en Firebase.';
    case 'auth/unauthorized-domain':
    case 'auth/invalid-api-key':
    case 'auth/project-not-found':
      return 'La configuración de Firebase no es válida o este dominio no está autorizado.';
    default:
      return 'No hemos podido iniciar sesión. Inténtalo de nuevo en unos minutos.';
  }
}
