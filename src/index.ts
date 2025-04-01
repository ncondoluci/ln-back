import Server from "./server.js";

try {
  const server = new Server();
  server.listen();
} catch (error) {
  console.log("Ocurrió un error inicializando el servidor: ", error);
}
