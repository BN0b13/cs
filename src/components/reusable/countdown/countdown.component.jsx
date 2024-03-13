import { useEffect, useState } from 'react';

import {
    MainContainer
} from './countdown.styles';

const Countdown = ({ countdownDate }) => {
    const [ timer, setTimer ] = useState('');

    useEffect(() => {
        startCountdown();
    }, []);


    const startCountdown = () => {
          
        const counter = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
    
            // Find the distance between now and the count down date
            const distance = countdownDate - now;

            if(distance <= 0) {
                clearInterval(counter);
                setTimer('0d 0h 0m 0s');
            }
    
            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            // Display the result in the element with id="demo"
            const timeShown = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

            setTimer(timeShown);
            
          }, 1000);
      }

    return (
        <MainContainer>
            <h4>{timer}</h4>
        </MainContainer>
    )
}

export default Countdown;