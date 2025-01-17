const participantModels = require("../models/participantModels");

class participantControllers {
    static async getParticipant (req, res) {
        try{
            const participants = await participantModels.getParticipant();
            res.status(200).json({data: participants})
        }catch(err){
            res.status(500).json({error: "Failed to fetch Participant"})
        }
    }
}

module.exports = participantControllers;