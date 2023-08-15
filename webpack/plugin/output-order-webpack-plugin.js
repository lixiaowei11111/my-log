const chalk = require("chalk");

class BasePlugin {
	constructor(options) {}
	apply(compiler) {
		compiler.hooks.done.tap("DonePlugin", stats => {
			console.log(
				chalk.blue("\n Your application is running here: https://0.0.0.0:8090"),
			);
		});
	}
}

module.exports = BasePlugin;
