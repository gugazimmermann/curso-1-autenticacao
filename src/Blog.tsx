import {Link} from "react-router-dom";

const Blog = (): JSX.Element => {
  return (
    <div className="container mx-auto flex flex-col min-h-screen bg-white">
      <div>
        <header className="w-full py-2 px-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
          <Link to="/" className="flex flex-row items-center">
            <img className="w-auto h-8 mr-2" src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
            <span className="text-xl font-bold">Curso 1 - Autenticação</span>
          </Link>
          <nav className="mt-4 sm:mt-0 flex flex-row gap-8">
            <Link to="/" className="transition-colors duration-300 transform hover:text-warning-500">
              Início
            </Link>
            <Link to="/blog" className="transition-colors duration-300 transform hover:text-warning-500">
              Blog
            </Link>
            <Link to="/entrar" className="transition-colors duration-300 transform hover:text-warning-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
              </svg>
            </Link>
          </nav>
        </header>
        <hr className="border-background-300" />
      </div>
      <main className="flex flex-grow flex-col items-center justify-start p-4">
        <section className="w-full">
          <h1 className="title">Todos os Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4 mt-4">
            <div className="flex flex-col items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="post one"
              />
              <div className="flex flex-col py-4">
                <h4 className="text-xl font-semibold">Lorem ipsum dolor sit amet.</h4>
                <span className="text-sm">01 Fevereiro 2024</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="post two"
              />
              <div className="flex flex-col py-4">
                <h4 className="text-xl font-semibold">Curabitur sit amet nibh aliquet.</h4>
                <span className="text-sm">20 Janeiro 2024</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="post three"
              />
              <div className="flex flex-col py-4">
                <h4 className="text-xl font-semibold">Nulla vel enim eu ipsum vestibulum suscipit.</h4>
                <span className="text-sm">12 Janeiro 2024</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="object-cover w-full h-56 rounded-lg lg:w-64"
                src="https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80"
                alt="post four"
              />
              <div className="flex flex-col py-4">
                <h4 className="text-xl font-semibold">Aliquam vel purus vitae justo porttitor.</h4>
                <span className="text-sm">01 Janeiro 2024</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <hr className="border-background-300" />
        <div className="p-2 flex flex-col items-center text-center">
          <Link to="/" className="flex flex-row items-center">
            <span className="text-xl font-bold">Curso 1 - Autenticação</span>
          </Link>
          <p className="mt-2">Aprenda React / Typescript Na Prática</p>
          <Link
            to="/entrar"
            className="px-4 py-2 mt-2 text-sm tracking-wider text-white bg-secondary-500 rounded-lg uppercase transition-colors duration-300 transform hover:bg-primary-500 focus:outline-none focus:bg-primary-500">
            Faça o Login
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
