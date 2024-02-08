import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.get( "/:id", async ( req, res ) => { 
    const { id = 0 } = req.params;
    try {
        const data = await fs.readFile( `./test/games/game-${id}.json`, 'utf-8' );
        res.send( data );
        // const { numOfRounds, categories } = JSON.parse( data );
        // res.send( `<b>${JSON.stringify(categories)}</b>` );
    } catch ( e ) {
        res.send( e );
    }
} ); 

export default router;