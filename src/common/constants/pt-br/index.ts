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

const AUTH = {
  USERUNVERIFIED: "Email não verificado.",
  USERUNAUTHORIZED: "Não autorizado, tente novamente.",
  EMAIL: "Email",
  EMAILERROR: "Email inválido.",
  EMAILNOTFOUND: "Email não encontrado.",
  EMAILUNVERIFIED: "Email não verificado.",
  PASSWORD: "Senha",
  PASSWORDERROR: "Senha inválida, senhas são diferente ou não tem o mínimo de 6 caracteres",
  REPEATPASSWORD: "Repita a Senha",
  CODE: "Código",
  CODEERROR: "Código inválido.",
  CODESENDED: "Código enviado para",
  SENDCODEERROR: "Erro ao enviar o código, tente novamente.",
  NAME: "Nome",
  NAMEERROR: "Nome inválido, mínimo 3 caracteres.",
  REGISTERERROR: "Ocorreu um erro ao cadastrar, tente novamente.",
  LINKFORGOTPASSWORD: "Esqueceu a senha? Clique aqui!",
  LINKREGISTER: "Não tem conta? Faça seu cadastro!",
  LINKALREDYREGISTERED: "Já tem cadastro? Faça seu login!",
  LINKVERIFYEMAIL: "Clique aqui para verificar o email!",
  LINKBACKTOLOGIN: "Voltar para o Login.",
  PASSWORDCHANGEERROR: "Ocorreu um erro ao alterar a senha, tente novamente.",
  PASSWORDCHANGESUCCESS: "Senha alterada com sucesso.",
  CURRENTPASSWORD: "Senha Atual",
  NEWPASSWORD: "Nova Senha",
  REPEATNEWPASSWORD: "Repita a Nova Senha",
  CHANGEUSERDATAERROR: "Ocorreu um erro ao atualizar o cadastro, tente novamente.",
  CHANGEUSERDATASUCCESS: "Cadastro atualizado com sucesso.",
  CHANGEUSERDATAEMAIL: "Email foi alterado, confirmação deverá ser feita antes do próximo login.",
};

const LOGIN = {
  TITLE: "Entrar no Sistema",
  BUTTON: "Entrar",
};

const REGISTER = {
  TITLE: "Novo Cadastro",
  BUTTON: "Cadastrar",
};

const VERIFYEMAIL = {
  TITLE: "Verificar Email",
  BUTTON: "Enviar Código",
  BUTTONRESEND: "Re-Enviar Código",
};

const FORGOTPASSWORD = {
  TITLE: "Recuperar Senha",
  BUTTON: "Receber Código",
};

const NEWPASSWORD = {
  TITLE: "Nova Senha",
  BUTTON: "Enviar",
};

const DASHBOARD = {
  TITLE: "Dashboard",
  WELCOME: "Bem Vindo,",
};

const ACCOUNT = {
  TITLE: "Meu Cadastro",
  CHANGEPASSWORD: {
    TITLE: "Alterar Senha",
    BUTTON: "Alterar",
  },
  USERDATA: {
    TITLE: "Meus Dados",
    BUTTON: "Atualizar",
  },
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
    REGISTER,
    VERIFYEMAIL,
    FORGOTPASSWORD,
    NEWPASSWORD,
    DASHBOARD,
    ACCOUNT,
  },
  AUTH,
});

export default PTBR;
