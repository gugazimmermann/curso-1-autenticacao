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
  TITLE: "Filmes em Cartaz",
  RELEASE: "Lançamento",
  BUTTON: "Voltar",
  NORESULT: "Nenhum resultado encontrado.",
  ERROR: "Ocorreu um erro, tente novamente.",
};

const LOGIN = {
  TITLE: "Entrar no Sistema",
};

const DASHBOARD = {
  TITLE: "Dashboard",
  WELCOME: "Bem Vindo,",
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
    DASHBOARD,
  },
});

export default PTBR;
