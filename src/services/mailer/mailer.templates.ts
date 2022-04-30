export const resetPassword = (code: string, url: string) => {
  return {
    text: `Ссылка для изменения пароля: ${url}/user/resetPassword/${code}`,
    subject: 'Смена пароля'
  };
};

export const changeEmail = (code: string, url: string) => {
  return {
    text: `Ссылка для изменения email: ${url}/user/changeEmail/${code}`,
    subject: 'Смена email'
  };
};

export const confirmEmail = (code: string, url: string) => {
  return {
    text: `Ссылка для подтверждения Почты: ${url}/user/confirmEmail/${code}`,
    subject: 'Подтверждение Почты'
  };
};
