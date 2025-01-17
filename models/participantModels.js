const db = require('../config/index');

class participantModels {
    static async getParticipant(){
        try{
            const [rows] = await db.query('SELECT * FROM participant');
            return rows;
        }catch(err){
            throw new Error('Databasse query failed');
        }
    }
}

module.exports = participantModels;