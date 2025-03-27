export const normalizeString = (str: string): string => {
    return str
      .normalize('NFD') // separa letras de sus acentos
      .replace(/[\u0300-\u036f]/g, '') // remueve acentos
      .replace(/[^\w]/g, '') // remueve todo lo que no sea letras, números o _
      .toLowerCase(); // minúsculas
  }
  