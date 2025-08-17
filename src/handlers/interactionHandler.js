const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const modalFiles = fs.readdirSync(path.join(__dirname, '../interactions/components/modals')).filter(file => file.endsWith('.js'));
    const buttonFiles = fs.readdirSync(path.join(__dirname, '../interactions/components/buttons')).filter(file => file.endsWith('.js'));
    const selectMenuFiles = fs.readdirSync(path.join(__dirname, '../interactions/components/selectmenus')).filter(file => file.endsWith('.js'));

    for (const file of modalFiles) {
        const modal = require(`../interactions/components/modals/${file}`);
        client.modals.set(file.split('.')[0], modal);
    }

    for (const file of buttonFiles) {
        const button = require(`../interactions/components/buttons/${file}`);
        client.buttons.set(file.split('.')[0], button);
    }

    for (const file of selectMenuFiles) {
        const selectMenu = require(`../interactions/components/selectmenus/${file}`);
        client.selectMenus.set(file.split('.')[0], selectMenu);
    }
};
