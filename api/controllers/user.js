var fs = require('fs');

function UserController() {

}


UserController.prototype.search = function (req, res) {
    if (req.query && req.query.q) {
        var rawdata = fs.readFileSync(__dirname.split('/controllers')[0] + '/config/info.json');
        rawdata = JSON.parse(rawdata);
        var content = rawdata && rawdata.info && rawdata.info.filter(function (value) {
            if (value.user_name.toLowerCase().indexOf(req.query.q.toLowerCase()) >= 0 || value.first_name.toLowerCase().indexOf(req.query.q.toLowerCase()) >= 0 || value.last_name.toLowerCase().indexOf(req.query.q.toLowerCase()) >= 0) {
                return true;
            }
            return false;
        });
        res.send(content);
    } else {
        res.send("Need required params 'q'");
    }

}

UserController.prototype.get = function (req, res) {
    var rawdata = fs.readFileSync(__dirname.split('/controllers')[0] + '/config/info.json');
    res.send(JSON.parse(rawdata).info);
}

UserController.prototype.delete = function (req, res) {
    if (req.params && req.params.email) {
        var index = 0;
        var rawdata = fs.readFileSync(__dirname.split('/controllers')[0] + '/config/info.json');
        rawdata = JSON.parse(rawdata);
        var content = rawdata && rawdata.info && rawdata.info.filter(function (value, i) {
            if (value.user_name === req.params.email) {
                index = i;
                return true;
            }
            return false;
        });
        if (content.length) {
            rawdata.info.splice(index, 1);
            fs.writeFile(__dirname.split('/controllers')[0] + '/config/info.json', JSON.stringify(rawdata));
            res.send({ message: 'success' });
        } else {
            res.send({ message: 'Invalid username' });
        }
    } else {
        res.send({ message: 'Required username' });
    }
}

module.exports = UserController;