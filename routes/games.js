import express from "express";

const router = express.Router();

router.get( "/:id", ( req, res ) => { 
    const { id = 0 } = req.params;
    res.send( `<b>${id}</b>` ); 
} ); 

export default router;