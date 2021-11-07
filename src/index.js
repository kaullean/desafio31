import config from './config';
import server from './services/server'
import { connectDb } from './services/db';
import os from 'os'
import cluster from 'cluster';
import winston from 'winston';


let cpus=os.cpus().length;

// export const logConfig={
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

const puerto=config.PORT;

if (config.MODO=='CLUSTER' && cluster.isMaster) {
  // logger.info("MODO CLUSTER");
  // logger.warn(`SE UTILIZARA EL MAXIMO DE CPUS => ${cpus}`);
  // logger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else{
  const PORT = config.PORT;
  server.listen(PORT ,() =>
    console.log(
    `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
    )
  );
}




