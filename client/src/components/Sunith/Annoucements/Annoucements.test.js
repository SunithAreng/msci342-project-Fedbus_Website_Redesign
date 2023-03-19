import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnnoucementsRender } from './AnnoucementRender';

describe('Annoucements component', () => {
    const obj = [
        {
            id: 1,
            title: 'Announcement 1',
            content: 'This is the content of announcement 1'
        },
        {
            id: 2,
            title: 'Announcement 2',
            content: 'This is the content of announcement 2'
        }
    ];
    it('renders the component', () => {
        render(<AnnoucementsRender announcements={obj} />);
        const titleElement = screen.getByText("Important Annoucements:");
        expect(titleElement).toBeInTheDocument();
    });

    it('renders annoucements', () => {
        render(<AnnoucementsRender announcements={obj} />);
        obj.forEach((item) => {
            const elements = Object.values(item);
            expect(screen.getAllByRole('heading', item));
        });
    });
});
