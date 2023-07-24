import { useEffect, useState } from 'react';

import {
    MainContainer
} from './countdown.styles';

const Countdown = () => {
    const [ timer, setTimer ] = useState('');

    useEffect(() => {
        startCountdown();
    }, []);


    const startCountdown = () => {
        const countDownDate = new Date("Aug 1, 2023 0:0:0").getTime();
          
        setInterval(function() {
    
            // Get today's date and time
            const now = new Date().getTime();
    
            // Find the distance between now and the count down date
            const distance = countDownDate - now;
    
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            // Display the result in the element with id="demo"
            const timeShown = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
            setTimer(timeShown);
            
          }, 1000);
      }

    return (
        <MainContainer>
            <h1>Sign Up Available August 1st, 2023</h1>
            <h4>Time Until Shop Opens...</h4>
            <h2>{timer}</h2>
        </MainContainer>
    )
}

export default Countdown;