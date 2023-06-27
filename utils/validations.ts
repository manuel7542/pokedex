export const isValidEmail = (email: string): boolean => {

  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email)
    ? undefined
    : 'El correo no parece ser válido';
}

export const isValidPassword = (password: string): boolean => {

  const match = String(password)
    .match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )

  return !!match;
};

export const isPassword = (email: string): string | undefined => {
  return isValidPassword(email)
    ? undefined
    : 'La contraseña no cumple con los requisitos';
}