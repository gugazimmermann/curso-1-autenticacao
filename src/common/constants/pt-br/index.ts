const MENU = {
  HOME: "Início",
  BLOG: "Blog",
};

const NOMATCH = {
  TEXT: "Oops! Página Não Encontrada",
  BUTTON: "Voltar",
};

const HERO = {
  TITLE: "Aprenda React / Typescript",
  SUBTITLE: "Na Prática",
  CONTENT:
    "Aprenda a desenvolver um completo app em React / Typecript com sistema de autenticação e testes cobrindo todo o código.",
};

const LOGINBUTTON = {
  TEXT: "Faça o Login",
};

const BLOG = {
  TITLE: "Todos os Posts",
};

const LOGIN = {
  TITLE: "Entrar no Sistema",
};

const PTBR = Object.freeze({
  LAYOUT: {
    MENU,
    NOMATCH,
  },
  COMPONENTS: {
    HERO,
    LOGINBUTTON,
  },
  PAGES: {
    BLOG,
    LOGIN,
  },
});

export default PTBR;
