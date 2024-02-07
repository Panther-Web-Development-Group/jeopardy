import express from "express";
import http from "http";
import path, { dirname } from "path";
import logger from "morgan";
import * as socketio from "socket.io";
import { fileURLToPath } from "url";

import indexRoute from "./routes/index.js";
import menuRoute from "./routes/menu.js";
// import gameRoute from "./routes/game.js";

const app = express();
const server = http.createServer( app );
const io = new socketio.Server( server );

const __dirname = fileURLToPath( path.dirname( import.meta.url ) );

app.set( 'view engine', 'pug' );
app.set( 'port', process.env.PORT ?? 3300 );
app.use( logger( 'dev' ) );

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', indexRoute );
app.use( '/menu', menuRoute );

app.use( "*", indexRoute );

// io.sockets.on( "connection", socket( io ) );

server.on( "listening", () => { 
    console.log( `Server listening on PORT ${app.get( 'port' )}` );
} );

server.listen( app.get( 'port' ) );