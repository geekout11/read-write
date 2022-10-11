const fs = require('fs');
const path = require('path');

function saveData(jsonPath, outFolder, overwrite) {

    let jPath = path.join(__dirname, jsonPath);

    fs.mkdir(outFolder, err => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.log('Folder juz istnieje')
                return;
            }
            console.log(err);
        } else {
            console.log('Utworzono folder')
        }
    })

    fs.readdir(path.join(__dirname, outFolder), function (err, files) {
        if (err) {
            console.log(err)
        } else {
            if (files.length > 0 && overwrite) {
                fs.readFile(jPath, 'utf-8', function (err, data) {
                    if (err) {
                        console.log('Błąd odczytu')
                    } else {


                        let userList = JSON.parse(data);
                        let name = [];
                        let line = '';
                        let filename = '';

                        userList.forEach(value => {
                            name = (value.name).split(' ');
                            line = 'Name: ' + name[0] + '\n';
                            line += 'Surname: ' + name[1] + '\n';
                            line += 'Street: ' + value.address.street + '\n';
                            line += 'Zip Code: ' + value.address.zipcode + '\n';
                            line += 'City: ' + value.address.city + '\n';
                            line += 'Phone: ' + value.phone + '\n';
                            filename = path.join(outFolder, value.id + '-' + name[0] + '-' + name[1] + '.txt');
                            if (fs.existsSync(filename) && overwrite) {
                                fs.rmSync(filename);
                            }


                            fs.writeFile(filename, line, err => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('Utworzono plik')
                                }
                            });


                        })
                    }
                })
            } else if (files.length === 0) {
                fs.readFile(jPath, 'utf-8', function (err, data) {
                    if (err) {
                        console.log('Błąd odczytu')
                    } else {


                        let userList = JSON.parse(data);
                        let name = [];
                        let line = '';
                        let filename = '';

                        userList.forEach(value => {
                            name = (value.name).split(' ');
                            line = 'Name: ' + name[0] + '\n';
                            line += 'Surname: ' + name[1] + '\n';
                            line += 'Street: ' + value.address.street + '\n';
                            line += 'Zip Code: ' + value.address.zipcode + '\n';
                            line += 'City: ' + value.address.city + '\n';
                            line += 'Phone: ' + value.phone + '\n';
                            filename = path.join(outFolder, value.id + '-' + name[0] + '-' + name[1] + '.txt');
                            if (fs.existsSync(filename) && overwrite) {
                                fs.rmSync(filename);
                            }


                            fs.writeFile(filename, line, err => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('Utworzono plik')
                                }
                            });


                        })
                    }
                })
            } else {
                console.log('Nie można tego zrobić')
            }
        }
    })
}



module.exports = {
    saveData: saveData
}