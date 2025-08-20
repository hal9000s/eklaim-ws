const { Router } = require('baskom');
const { body, param } = require('express-validator');
const { authenticate } = require('../../middlewares/AuthMiddleware');
const { generateValidator } = require('../../helpers/utils');
const Service = require('./EklaimServices');

const service = new Service();

const noSEPValidator = [param('nomor_sep').isString(), generateValidator];
const groupingValidator = [
    param('stage').isString(),
    param('nomor_sep').isString(),
    generateValidator
];
const claimFinalValidator = [
    param('coder').isString(),
    param('nomor_sep').isString(),
    generateValidator
];

class EklaimController extends Router {
    constructor() {
        super();

        // ========================================================
        // iDRG ROUTES
        // ========================================================

        this.post('/new-claim', authenticate, (req, res) =>
            service.newClaim(req, res)
        );

        this.post(
            '/set-claim-data/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.setClaimData(req, res)
        );

        this.post(
            '/idrg-diagnosa-set/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGDiagnosaSet(req, res)
        );

        this.post(
            '/idrg-diagnosa-get/:nomor_sep',
            ...noSEPValidator,
            (req, res) => service.iDRGDiagnosaGet(req, res)
        );

        this.post(
            '/idrg-procedure-set/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGProcedureSet(req, res)
        );

        this.post(
            '/idrg-procedure-get/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGProcedureGet(req, res)
        );

        this.post(
            '/grouping-idrg/sep/:nomor_sep/stage/:stage',
            authenticate,
            ...groupingValidator,
            (req, res) => service.groupingiDRG(req, res)
        );

        this.post(
            '/final-idrg/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.finaliDRG(req, res)
        );

        this.post(
            '/reedit-idrg/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.reeditiDRG(req, res)
        );

        this.post(
            '/idrg-to-inacbg-import/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGToINACBGImport(req, res)
        );

        // ========================================================
        // INACBG ROUTES
        // ========================================================

        this.post(
            '/inacbg-diagnosa-set/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iNACBGDiagnosaSet(req, res)
        );

        this.post(
            '/inacbg-diagnosa-get/:nomor_sep',
            ...noSEPValidator,
            (req, res) => service.iNACBGDiagnosaGet(req, res)
        );

        this.post(
            '/inacbg-procedure-set/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iNACBGProcedureSet(req, res)
        );

        this.post(
            '/inacbg-procedure-get/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iNACBGProcedureGet(req, res)
        );

        this.post(
            '/grouping-inacbg/sep/:nomor_sep/stage/:stage',
            authenticate,
            ...groupingValidator,
            (req, res) => service.groupingINACBG(req, res)
        );

        this.post(
            '/final-inacbg/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.finalINACBG(req, res)
        );

        this.post(
            '/reedit-inacbg/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.reeditINACBG(req, res)
        );

        this.post(
            '/claim-final/sep/:nomor_sep/coder/:coder',
            authenticate,
            ...claimFinalValidator,
            (req, res) => service.claimFinal(req, res)
        );

        this.post(
            '/claim-reedit/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.claimReedit(req, res)
        );

        this.post(
            '/claim-send/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.claimSend(req, res)
        );

        this.post(
            '/get-claim-data/:nomor_sep',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.getClaimData(req, res)
        );
    }
}

module.exports = new EklaimController();
