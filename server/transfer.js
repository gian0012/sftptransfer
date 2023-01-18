const Client = require('ssh2-sftp-client');


function transferData(transferObj) {

    const config = {
        host: transferObj.address,
        username: transferObj.username,
        password: transferObj.password,
        port: transferObj.port,

    };
    console.log(config)

    const sftp = new Client('transfer');


    sftp.connect(config)
        .then(() => {
            return sftp.cwd();
        })
        .then(p => {
            console.log(`Remote working directory is ${p}`);
            return sftp.end();
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
        });
}

module.exports = { transferData };
