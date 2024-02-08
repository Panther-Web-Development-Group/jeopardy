import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.get( "/", async ( req, res ) => {
    const data = await fs.readFile( "./test/jeopardy.json", "utf-8" );
    const { games } = JSON.parse( data );
    res.render( "menu", { games } );
} );

export default router;