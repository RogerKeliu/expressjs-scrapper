const fs = require('fs');

class File {

    writeFile(myData, name) {
        
        let data = JSON.stringify(myData);
        console.log(data);
        console.log('eeeeeeeeeeee');
        fs.appendFile(`${name}.json`, data + ',', (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
        console.log('end')
    }
}

module.exports = File;