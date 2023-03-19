import React from 'react';
import { AnnoucementAPI } from './AnnoucementAPI';
import { AnnoucementsRender } from './AnnoucementRender';

const Annoucements = () => {
    const announcements = AnnoucementAPI();
    return (
        <AnnoucementsRender announcements={announcements} />
    );
}

export default Annoucements;

