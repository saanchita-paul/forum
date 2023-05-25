import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from "axios";
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'b0b6445e9d4028d3e18b',
    cluster: 'ap2',
    forceTLS: true,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('http://127.0.0.1:8000/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                        callback(null, response.data);
                    })
                    .catch(error => {
                        callback(error);
                    });
            }
        };
    },
});

