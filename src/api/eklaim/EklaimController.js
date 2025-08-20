const { Router } = require('baskom');
const { body, param } = require('express-validator');
const { authenticate } = require('../../middlewares/AuthMiddleware');
const { generateValidator } = require('../../helpers/utils');
const Service = require('./EklaimServices');

const service = new Service();

const newClaimValidator = [
    body('nomor_kartu').isString(),
    body('nomor_sep').isString(),
    body('nomor_rm').isString(),
    body('nama_pasien').isString(),
    body('tgl_lahir').isString(),
    body('gender').isString(),
    generateValidator
];
const setClaimValidator = [
    body('nomor_sep').isString(),
    body('nomor_kartu').isString(),
    body('tgl_masuk').isString(),
    body('tgl_pulang').isString(),
    body('cara_masuk').isString(),
    body('jenis_rawat').isInt(),
    body('kelas_rawat').isInt(),
    body('adl_sub_acute').isInt(),
    body('adl_chronic').isInt(),
    body('icu_indikator').isInt(),
    body('icu_los').isInt(),
    body('upgrade_class_ind').isInt(),
    body('add_payment_pct').isInt(),
    body('birth_weight').isInt(),
    body('sistole').isInt(),
    body('diastole').isInt(),
    body('discharge_status').isInt(),
    body('tarif_rs.prosedur_non_bedah').isString(),
    body('tarif_rs.prosedur_bedah').isString(),
    body('tarif_rs.konsultasi').isString(),
    body('tarif_rs.tenaga_ahli').isString(),
    body('tarif_rs.keperawatan').isString(),
    body('tarif_rs.penunjang').isString(),
    body('tarif_rs.radiologi').isString(),
    body('tarif_rs.laboratorium').isString(),
    body('tarif_rs.pelayanan_darah').isString(),
    body('tarif_rs.rehabilitasi').isString(),
    body('tarif_rs.kamar').isString(),
    body('tarif_rs.rawat_intensif').isString(),
    body('tarif_rs.obat').isString(),
    body('tarif_rs.obat_kronis').isString(),
    body('tarif_rs.obat_kemoterapi').isString(),
    body('tarif_rs.alkes').isString(),
    body('tarif_rs.bmhp').isString(),
    body('tarif_rs.sewa_alat').isString(),
    body('pemulasaraan_jenazah').isInt(),
    body('kantong_jenazah').isInt(),
    body('peti_jenazah').isInt(),
    body('plastik_erat').isInt(),
    body('desinfektan_jenazah').isInt(),
    body('mobil_jenazah').isInt(),
    body('desinfektan_mobil_jenazah').isInt(),
    body('covid19_status_cd').isInt(),
    body('nomor_kartu_t').isString(),
    body('episodes').isString(),
    body('akses_naat').isString(),
    body('isoman_ind').isInt(),
    body('bayi_lahir_status_cd').isInt(),
    body('dializer_single_use').isInt(),
    body('kantong_darah').isInt(),
    body('alteplase_ind').isInt(),
    body('tarif_poli_eks').isString(),
    body('nama_dokter').isString(),
    body('kode_tarif').isString(),
    body('payor_id').isInt(),
    body('payor_cd').isString(),
    body('cob_cd').isInt(),
    body('coder_nik').isString(),
    generateValidator
];
const noRMValidator = [body('nomor_rm').isString(), generateValidator];
const noSEPValidator = [body('nomor_sep').isString(), generateValidator];
const coderValidator = [
    body('coder_nik').isString(),
    body('nomor_sep').isString(),
    generateValidator
];
const claimSendValidator = [
    body('start_dt').isString(),
    body('stop_dt').isString(),
    body('jenis_rawat').isString(),
    body('date_type').isString(),
    generateValidator
];
const searchValidator = [body('keyword').isString(), generateValidator];
const payorValidator = [body('payor_id').isString(), generateValidator];
const sITBValidator = [
    body('nomor_sep').isString(),
    body('nomor_register_sitb').isString(),
    generateValidator
];
const covidClaimValidator = [
    body('nomor_sep').isString(),
    body('nomor_pengajuan').isString(),
    generateValidator
];

class EklaimController extends Router {
    constructor() {
        super();

        // ========================================================
        // PATIENT ROUTES
        // ========================================================

        this.post(
            '/update-patient',
            authenticate,
            ...noRMValidator,
            (req, res) => service.updatePatient(req, res)
        );

        this.post(
            '/delete-patient',
            authenticate,
            ...coderValidator,
            (req, res) => service.deletePatient(req, res)
        );

        // ========================================================
        // iDRG ROUTES
        // ========================================================

        this.post(
            '/idrg-diagnosa-set',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGDiagnosaSet(req, res)
        );

        this.post(
            '/idrg-diagnosa-get',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGDiagnosaGet(req, res)
        );

        this.post(
            '/idrg-procedure-set',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGProcedureSet(req, res)
        );

        this.post(
            '/idrg-procedure-get',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGProcedureGet(req, res)
        );

        this.post(
            '/grouping-idrg',
            authenticate,
            ...coderValidator,
            (req, res) => service.groupingiDRG(req, res)
        );

        this.post('/final-idrg', authenticate, ...noSEPValidator, (req, res) =>
            service.finaliDRG(req, res)
        );

        this.post('/reedit-idrg', authenticate, ...noSEPValidator, (req, res) =>
            service.reeditiDRG(req, res)
        );

        this.post(
            '/idrg-to-inacbg-import',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iDRGToINACBGImport(req, res)
        );

        // ========================================================
        // INACBG ROUTES
        // ========================================================

        this.post(
            '/inacbg-diagnosa-set',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iNACBGDiagnosaSet(req, res)
        );

        this.post(
            '/inacbg-diagnosa-get',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iNACBGDiagnosaGet(req, res)
        );

        this.post(
            '/inacbg-procedure-set',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iNACBGProcedureSet(req, res)
        );

        this.post(
            '/inacbg-procedure-get',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.iNACBGProcedureGet(req, res)
        );

        this.post(
            '/grouping-inacbg',
            authenticate,
            ...coderValidator,
            (req, res) => service.groupingINACBG(req, res)
        );

        this.post(
            '/final-inacbg',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.finalINACBG(req, res)
        );

        this.post(
            '/reedit-inacbg',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.reeditINACBG(req, res)
        );

        // ========================================================
        // CLAIM ROUTES
        // ========================================================

        this.post(
            '/new-claim',
            authenticate,
            ...newClaimValidator,
            (req, res) => service.newClaim(req, res)
        );

        this.post(
            '/set-claim-data',
            authenticate,
            ...setClaimValidator,
            (req, res) => service.setClaimData(req, res)
        );

        this.post('/claim-final', authenticate, ...coderValidator, (req, res) =>
            service.claimFinal(req, res)
        );

        this.post(
            '/claim-reedit',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.claimReedit(req, res)
        );

        this.post(
            '/claim-send-individual',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.claimSendIndividual(req, res)
        );

        this.post(
            '/claim-send',
            authenticate,
            ...claimSendValidator,
            (req, res) => service.claimSend(req, res)
        );

        this.post(
            '/get-claim-data',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.getClaimData(req, res)
        );

        this.post('/claim-print', authenticate, ...noSEPValidator, (req, res) =>
            service.claimPrint(req, res)
        );

        this.post(
            '/get-claim-status',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.getClaimStatus(req, res)
        );

        this.post(
            '/retrieve-claim-status',
            authenticate,
            ...covidClaimValidator,
            (req, res) => service.retrieveClaimStatus(req, res)
        );

        this.post(
            '/generate-claim-number',
            authenticate,
            ...payorValidator,
            (req, res) => service.generateClaimNumber(req, res)
        );

        this.post(
            '/get-claim-status',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.claimStatus(req, res)
        );

        // ========================================================
        // DIAGNOSIS ROUTES
        // ========================================================

        this.post(
            '/search-diagnosis',
            authenticate,
            ...searchValidator,
            (req, res) => service.searchDiagnosis(req, res)
        );

        this.post(
            '/search-procedure',
            authenticate,
            ...searchValidator,
            (req, res) => service.searchProcedure(req, res)
        );

        this.post(
            '/search-diagnosis-inagrouper',
            authenticate,
            ...searchValidator,
            (req, res) => service.searchDiagnosisInagrouper(req, res)
        );

        this.post(
            '/search-procedure-inagrouper',
            authenticate,
            ...searchValidator,
            (req, res) => service.searchProcedureInagrouper(req, res)
        );

        // ========================================================
        // SITB ROUTES
        // ========================================================

        this.post(
            '/sitb-validate',
            authenticate,
            ...sITBValidator,
            (req, res) => service.sITBValidate(req, res)
        );

        this.post(
            '/sitb-invalidate',
            authenticate,
            ...noSEPValidator,
            (req, res) => service.sITBInvalidate(req, res)
        );
    }
}

module.exports = new EklaimController();
