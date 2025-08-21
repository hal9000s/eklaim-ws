const { eKlaim, handleEklaimError } = require('../../helpers/eKlaim');
const eklaim_resp = require('../../helpers/eKlaimResp');
const { inacbgEncrypt } = require('../../helpers/utils');
const resp = require('../../helpers/response');
const { StatusCodes } = require('http-status-codes');
const { DOCUMENT_ALLOWED_EXTENSIONS } = require('../../app.constant');

const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));

class EklaimServices {
    constructor() {}

    // ========================================================
    // PATIENT SERVICES
    // ========================================================

    /*==================== Update Patient ====================*/
    async updatePatient(req, res) {
        const { nomor_rm } = req.body;
        const payload = {
            metadata: {
                method: 'update_patient',
                nomor_rm: nomor_rm
            },
            data: req.body
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Delete Patient ====================*/
    async deletePatient(req, res) {
        const { nomor_rm, coder_nik } = req.body;
        const payload = {
            metadata: {
                method: 'delete_patient'
            },
            data: {
                nomor_rm: nomor_rm,
                coder_nik: coder_nik
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    // ========================================================
    // iDRG SERVICES
    // ========================================================

    /*==================== iDRG Diagnosa Set ====================*/
    async iDRGDiagnosaSet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'idrg_diagnosa_set',
                nomor_sep: nomor_sep
            },
            data: req.body
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== iDRG Diagnosa Get ====================*/
    async iDRGDiagnosaGet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'idrg_diagnosa_get'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== iDRG Procedure Set ====================*/
    async iDRGProcedureSet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'idrg_procedure_set',
                nomor_sep: nomor_sep
            },
            data: req.body
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== iDRG Procedure Get ====================*/
    async iDRGProcedureGet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'idrg_procedure_get'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Grouping iDRG ====================*/
    async groupingiDRG(req, res) {
        const { stage, nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'grouper',
                stage: stage,
                grouper: 'idrg'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Final iDRG ====================*/
    async finaliDRG(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'idrg_grouper_final'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Reedit iDRG ====================*/
    async reeditiDRG(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'idrg_grouper_reedit'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== iDRG To INACBG Import====================*/
    async iDRGToINACBGImport(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'idrg_to_inacbg_import'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    // ========================================================
    // INACBG SERVICES
    // ========================================================

    /*==================== INACBG Diagnosa Set ====================*/
    async iNACBGDiagnosaSet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'inacbg_diagnosa_set',
                nomor_sep: nomor_sep
            },
            data: req.body
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== INACBG Diagnosa Get ====================*/
    async iNACBGDiagnosaGet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'inacbg_diagnosa_get'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== INACBG Procedure Set ====================*/
    async iNACBGProcedureSet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'inacbg_procedure_set',
                nomor_sep: nomor_sep
            },
            data: req.body
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== INACBG Procedure Get ====================*/
    async iNACBGProcedureGet(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'inacbg_procedure_get'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Grouping INACBG ====================*/
    async groupingINACBG(req, res) {
        const { stage, nomor_sep, special_cmg } = req.body;

        if (stage === '2') {
            if (!special_cmg || special_cmg === '') {
                return resp(
                    res,
                    StatusCodes.BAD_REQUEST,
                    'Special cmg pastikan diisi dengan benar'
                );
            }
        }

        const payload = {
            metadata: {
                method: 'grouper',
                stage: stage,
                grouper: 'inacbg'
            },
            data: {
                nomor_sep: nomor_sep,
                ...(stage === '2'
                    ? {
                          special_cmg: special_cmg
                      }
                    : undefined)
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Final INACBG ====================*/
    async finalINACBG(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'inacbg_grouper_final'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Reedit INACBG ====================*/
    async reeditINACBG(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'inacbg_grouper_reedit'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    // ========================================================
    // CLAIM SERVICES
    // ========================================================

    /*==================== New Claim ====================*/
    async newClaim(req, res) {
        const payload = {
            metadata: {
                method: 'new_claim'
            },
            data: req.body
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Set Claim Data ====================*/
    async setClaimData(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'set_claim_data',
                nomor_sep: nomor_sep
            },
            data: req.body
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Claim Final ====================*/
    async claimFinal(req, res) {
        const { nomor_sep, coder_nik } = req.body;
        const payload = {
            metadata: {
                method: 'claim_final'
            },
            data: {
                nomor_sep: nomor_sep,
                coder_nik: coder_nik
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Claim Reedit ====================*/
    async claimReedit(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'reedit_claim'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Claim Send Individual ====================*/
    async claimSendIndividual(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'send_claim_individual'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Get Claim Data ====================*/
    async getClaimData(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'get_claim_data'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Claim Print ====================*/
    async claimPrint(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'claim_print'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Claim Send ====================*/
    async claimSend(req, res) {
        const { start_dt, stop_dt, jenis_rawat, date_type } = req.body;
        const payload = {
            metadata: {
                method: 'claim_send'
            },
            data: {
                start_dt: start_dt,
                stop_dt: stop_dt,
                jenis_rawat: jenis_rawat,
                date_type: date_type
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Generate Claim Number ====================*/
    async generateClaimNumber(req, res) {
        const { payor_id } = req.body;
        const payload = {
            metadata: {
                method: 'generate_claim_number'
            },
            data: {
                payor_id: payor_id
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Get Claim Status ====================*/
    async getClaimStatus(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'get_claim_status'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Retrieve Claim Status ====================*/
    async retrieveClaimStatus(req, res) {
        const { nomor_sep, nomor_pengajuan } = req.body;
        const payload = {
            metadata: {
                method: 'retrieve_claim_status'
            },
            data: {
                nomor_sep: nomor_sep,
                nomor_pengajuan: nomor_pengajuan
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Delete Claim ====================*/
    async deleteClaim(req, res) {
        const { nomor_sep, coder_nik } = req.body;
        const payload = {
            metadata: {
                method: 'delete_claim'
            },
            data: {
                nomor_sep: nomor_sep,
                coder_nik: coder_nik
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    // ========================================================
    // DIAGNOSIS SERVICES
    // ========================================================

    /*==================== Search Diagnosis ====================*/
    async searchDiagnosis(req, res) {
        const { keyword } = req.body;
        const payload = {
            metadata: {
                method: 'search_diagnosis'
            },
            keyword: keyword
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Search Procedure ====================*/
    async searchProcedure(req, res) {
        const { keyword } = req.body;
        const payload = {
            metadata: {
                method: 'search_procedures'
            },
            keyword: keyword
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Search Diagnosis INA Grouper ====================*/
    async searchDiagnosisInagrouper(req, res) {
        const { keyword } = req.body;
        const payload = {
            metadata: {
                method: 'search_diagnosis_inagrouper'
            },
            keyword: keyword
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== Search Procedure INA Grouper ====================*/
    async searchProcedureInagrouper(req, res) {
        const { keyword } = req.body;
        const payload = {
            metadata: {
                method: 'search_procedures_inagrouper'
            },
            keyword: keyword
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    // ========================================================
    // SITB SERVICES
    // ========================================================

    /*==================== SITB Validate ====================*/
    async sITBValidate(req, res) {
        const { nomor_sep, nomor_register_sitb } = req.body;
        const payload = {
            metadata: {
                method: 'sitb_validate'
            },
            data: {
                nomor_sep: nomor_sep,
                nomor_register_sitb: nomor_register_sitb
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== SITB Invalidate ====================*/
    async sITBInvalidate(req, res) {
        const { nomor_sep } = req.body;
        const payload = {
            metadata: {
                method: 'sitb_invalidate'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    // ========================================================
    // FILES SERVICES
    // ========================================================

    /*==================== File Upload ====================*/
    async fileUpload(req, res) {
        const { nomor_sep, file_class } = req.body;

        if (!req.files || !req.files.file) {
            return resp(res, StatusCodes.BAD_REQUEST, 'File is required');
        }
        if (!DOCUMENT_ALLOWED_EXTENSIONS.includes(req.files.file.mimetype)) {
            return resp(res, StatusCodes.BAD_REQUEST, 'Invalid file type');
        }

        const file = req.files.file.data.toString('base64');
        const payload = {
            metadata: {
                method: 'file_upload',
                nomor_sep: nomor_sep,
                file_class: file_class,
                file_name: req.files.file.name
            },
            data: file
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== File Delete ====================*/
    async fileDelete(req, res) {
        const { nomor_sep, file_id } = req.body;

        const payload = {
            metadata: {
                method: 'file_delete'
            },
            data: {
                nomor_sep: nomor_sep,
                file_id: file_id
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }

    /*==================== File Get ====================*/
    async fileGet(req, res) {
        const { nomor_sep } = req.body;

        const payload = {
            metadata: {
                method: 'file_get'
            },
            data: {
                nomor_sep: nomor_sep
            }
        };

        try {
            let response = await eKlaim().post('', inacbgEncrypt(payload));
            return eklaim_resp(req, res, response);
        } catch (error) {
            return handleEklaimError(res, error);
        }
    }
}

module.exports = EklaimServices;
