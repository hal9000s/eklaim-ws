class HomeServices {
    constructor() {}

    /*==================== Home ====================*/
    async index(req, res) {
        res.status(200).send(
            'Welcome to E-Klaim Service Catalog \n \n \n@Majalengka Hospital - 2025'
        );
    }
}

module.exports = HomeServices;
