"use strict";

var _config = _interopRequireDefault(require("./config"));

var _server = _interopRequireDefault(require("./services/server"));

var _db = require("./services/db");

var _os = _interopRequireDefault(require("os"));

var _cluster = _interopRequireDefault(require("cluster"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let cpus = _os.default.cpus().length; // export const logConfig={
//   level:'info',
//   transports: [
//     new winston.transports.Console({level:'info'}),
//     new winston.transports.File({
//       filename:'./src/logs/warn.log',
//       level:'warn'
//     })
//   ]
// };
// const logger = winston.createLogger(logConfig)


const puerto = _config.default.PORT;

if (_config.default.MODO == 'CLUSTER' && _cluster.default.isMaster) {
  // logger.info("MODO CLUSTER");
  // logger.warn(`SE UTILIZARA EL MAXIMO DE CPUS => ${cpus}`);
  // logger.info(`PID MASTER ${process.pid}`);
  for (let i = 0; i < cpus; i++) {
    _cluster.default.fork();
  }
} else {
  const PORT = _config.default.PORT;

  _server.default.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`));
}