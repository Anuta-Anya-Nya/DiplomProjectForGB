import Master from '../models/Master';
import Service from '../models/Service';
import User from '../models/User';

class Shedule {

    constructor(id, date, time, userId, masterId, serviceId, masterName, serviceTitle, userName) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.userId = userId;
        this.masterId = masterId;
        this.serviceId = serviceId;
        this.master = new Master(masterId, masterName)
        this.service = new Service(serviceId, serviceTitle)
        this.user = new User(null, null, null, userName)
    }
}

export default Shedule;

