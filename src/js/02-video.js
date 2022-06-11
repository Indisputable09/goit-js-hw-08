import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

const watchedPercentage = function (data) {

    localStorage.setItem('videoplayer-current-time', data.seconds);
}
const previousTime = localStorage.getItem('videoplayer-current-time');
 player.setCurrentTime(previousTime);

player.on('timeupdate', throttle(watchedPercentage, 1000));