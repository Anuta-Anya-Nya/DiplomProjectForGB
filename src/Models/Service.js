class User {
    id;
    userName;
    userSurname
    birthdate;
    phone;
    userRole;
    login;
    password;
    
    constructor(id, masterName, birthdate, phone, position, photo, aboutText, groupServiceId) {
        this.id = id;
        this.masterName = masterName;
        this.birthdate = birthdate;
        this.phone = phone;
        this.position = position;
        this.photo = photo;
        this.aboutText = aboutText;
        this.groupServiceId = groupServiceId;
    }    
}

export default User;