import { RequestHandler } from "express";

export const tagChecker: RequestHandler = (req, res, next) => {
    const {tag} = req.query; // Puede ser undefined, '' o 'cadena/string'
    if(!tag) {
        res.status(400).json({
            success: false,
            message: 'Patámetro de busqueda "tag" no es correcto'
        });
        return;
    }
    next();
}