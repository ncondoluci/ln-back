import { RequestHandler } from "express";

export const tagChecker: RequestHandler = (req, res, next) => {
    const { tag } = req.query; // Puede ser undefined, '' o 'cadena/string'
    if(typeof tag !== 'string' || tag.trim() === '') {
        res.status(400).json({
            success: false,
            message: 'Patámetro de busqueda "tag" no es correcto'
        });
        return;
    }
    next();
}
export const flagChecker: RequestHandler = (req, res, next) => {
    const { haveVoucher } = req.query; // Puede ser undefined, '' o 'cadena/string'
    if(typeof haveVoucher !== 'string' || haveVoucher.trim() === '') {
        res.status(400).json({
            success: false,
            message: 'Patámetro de busqueda "haveVoucher" no es correcto'
        });
        return;
    }
    next();
}