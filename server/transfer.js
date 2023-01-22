const Client = require('ssh2-sftp-client');
const fs = require('fs');

function transferData(transferObj) {

    const config = {
        host: transferObj.address,
        username: transferObj.username,
        password: transferObj.password,
        port: transferObj.port,
        folder: transferObj.folder,
        file_path: transferObj.filePath,
        file_name: transferObj.fileName
    };

    const remotePath = config.folder + '/' + config.file_name;
    const localPath = fs.createReadStream(config.file_path);

    const sftp = new Client('transfer');

    sftp.connect(config)
        .then(() => sftp.put(localPath, remotePath))
        .catch((err) => {
            if (err) return console.log(err);

        })
        .finally(() => {
            fs.unlink(config.file_path, function (err) {
                if (err) return console.log(err);
            });
            sftp.end()
        })


}

module.exports = {transferData};
