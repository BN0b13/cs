import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ThankYou from '../../components/thank-you/thank-you.component';

const ThankYouPage = () => (
    <Routes>
        <Route path="/:refId" element={<ThankYou />} />
    </Routes>
);

export default ThankYouPage;