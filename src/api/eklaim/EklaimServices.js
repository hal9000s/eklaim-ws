const { eKlaim, handleEklaimError } = require('../../helpers/eKlaim');
const eklaim_resp = require('../../helpers/eKlaimResp');
const { inacbgEncrypt } = require('../../helpers/utils');
const resp = require('../../helpers/response');
const { StatusCodes } = require('http-status-codes');

const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));

class EklaimServices {
    constructor() {}

    // ========================================================
    // iDRG SERVICES
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
        const { nomor_sep } = req.params;
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

    /*==================== iDRG Diagnosa Set ====================*/
    async iDRGDiagnosaSet(req, res) {
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { stage, nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
        const { stage, nomor_sep } = req.params;
        const { special_cmg } = req.body;

        if (stage === '2') {
            if (!special_cmg || special_cmg === '') {
                return resp(
                    res,
                    StatusCodes.BAD_REQUEST,
                    'Special cmg tidak boleh kosong'
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
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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

    /*==================== Claim Final ====================*/
    async claimFinal(req, res) {
        const { nomor_sep, coder } = req.params;
        const payload = {
            metadata: {
                method: 'claim_final'
            },
            data: {
                nomor_sep: nomor_sep,
                coder_nik: coder
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
        const { nomor_sep } = req.params;
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

    /*==================== Claim Send ====================*/
    async claimSend(req, res) {
        const { nomor_sep } = req.params;
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
        const { nomor_sep } = req.params;
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
}

module.exports = EklaimServices;
