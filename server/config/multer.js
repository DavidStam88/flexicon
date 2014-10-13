/**
 * Created by david on 07-06-14.
 */

module.exports = {
    dest: '../client/images/uploads',
    rename: function (fieldname, filename) {
        return "ava" + Date.now()
    },
    limits: {
        fieldNameSize: 100,
        fileSize : 12000000,
        files: 1,
        fields: 1
    }
};