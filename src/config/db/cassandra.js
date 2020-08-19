const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'shoutapp',
    credentials: { username: 'cassandra', password: 'cassandra' }
});
client.connect(function (err, result) {
    console.log('cassdandra connected')
});

module.exports = { client };