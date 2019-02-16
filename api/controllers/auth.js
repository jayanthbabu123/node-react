var fs = require('fs');
var md5 = require('md5');

function AuthController() {

}

AuthController.prototype.login = function (req, res) {
    var info = req.body;
    if (info && info.user_name && info.password) {
        var rawdata = fs.readFileSync(__dirname.split('/controllers')[0] + '/config/info.json');
        rawdata = JSON.parse(rawdata);
        var content = rawdata && rawdata.info && rawdata.info.filter(function (value) {
            if (value.user_name === info.user_name) {
                return true;
            }
            return false;
        });
        if (content.length) {
            if (content[0].password === md5(info.password)) {
                res.send({ message: 'success' });
            } else {
                res.send({ message: 'Invalid password' });
            }
        } else {
            res.send({ message: 'Invalid username' });
        }
    } else {
        res.send({ message: 'Required fields' });
    }
}

AuthController.prototype.signup = function (req, res) {
    var info = req.body;
    if (info && info.user_name && info.password && info.first_name && info.last_name) {
        var rawdata = fs.readFileSync(__dirname.split('/controllers')[0] + '/config/info.json');
        rawdata = JSON.parse(rawdata);
        var content = rawdata && rawdata.info && rawdata.info.filter(function (value) {
            if (value.user_name === info.user_name) {
                return true;
            }
            return false;
        });
        if (content.length) {
            res.send({ message: 'User already exits' });
        } else {
            info.password = md5(info.password);
            rawdata.info.push(info);
            fs.writeFile(__dirname.split('/controllers')[0] + '/config/info.json', JSON.stringify(rawdata));
            res.send({ message: 'success' });
        }
    } else {
        res.send({ message: 'Required fields' });
    }
}

module.exports = AuthController;