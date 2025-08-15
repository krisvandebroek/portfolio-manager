const { app } = require('electron');
const fs = require('fs');
const path = require('path');

const defaults = {
  window: {
    width: 800,
    height: 600,
  },
};

function getConfig() {
  const configPath = path.join(app.getPath('userData'), 'config.json');
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (error) {
    fs.writeFileSync(configPath, JSON.stringify(defaults, null, 2));
    return defaults;
  }
}

function setConfig(key, value) {
  const configPath = path.join(app.getPath('userData'), 'config.json');
  const config = getConfig();
  config[key] = value;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

module.exports = {
  getConfig,
  setConfig,
};
