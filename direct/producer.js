const amqplib = require('amqplib')

const exchangeName = 'direct_logs';
const args = process.argv.splice(2)
const routingKey = args[0]
const message = args[1] || "Direct Exchange Type Implementation"

const producer = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'direct', {durable: false})
    channel.publish(exchangeName, routingKey, Buffer.from(message))
    console.log(`[X] Producer: Log Type: ${routingKey}, Message: ${message}`)
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500);
}

producer()