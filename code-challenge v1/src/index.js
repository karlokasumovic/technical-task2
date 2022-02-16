const { getColor } = require('./apiMock');

const { Color } = require('./classes');

async function getColors(array, callback) {
	var index = 0;
	var interval = setInterval(async function () {
		const finalColor = await getColor(array[index++].name)
		callback(finalColor)
		if (index == array.length) {
			clearInterval(interval);
		}
	}, 500)

}

function colors() {
	if (process.argv[2] === "async") {
		const colorOrder = process.argv[3]
		const newColorOrder = colorOrder.slice(1, -1)
		const orderArray = newColorOrder.split(",")
		function loop(array, callback) {
			array.map(async color => {
				color1 = new Color(color)
				const finalColor = await getColor(color1.name)
				callback(finalColor)
			})
		}
		loop(orderArray, function (color) {
			console.log(color);
			console.log(color.RGB)
			console.log(color.HEX);
		})
	}
	if (process.argv[2] === "sync") {
		const colorOrder = process.argv[3]
		const newColorOrder = colorOrder.slice(1, -1)
		const orderArray = newColorOrder.split(",")
		const a = []
		orderArray.forEach(color => {
			color1 = new Color(color)
			a.push(color1)
		})
		getColors(a, function (colors) {
			console.log(colors);
			console.log(colors.RGB);
			console.log(colors.HEX);
		})

	}
}

colors()

/*
To run application:
node ~/code-challenge/src/index.js async '["green","blue","red","white","black"]'
or
node ~/code-challenge/src/index.js sync '["green","blue","red","white","black"]'
*/