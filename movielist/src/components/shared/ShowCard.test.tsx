
import { render, screen } from '@testing-library/react';
import { ShowCard } from './ShowCard';
import ShowDetails from '../features/shows/ShowDetails';
import { IShowProp } from '@/typings/show';
import { title } from 'process';
import { mock } from 'node:test';

jest.mock("./ShowCard", () => {
    ShowCard: jest.fn();
})


describe('ShowCard', () => {
    
    const mockShow = {id: 0, title: "mockTitle", description: "mockDescription", average_rating: 3, image_url: "mockUrl", no_of_reviews: 3};
    
    beforeEach(() => {
        render(<ShowCard show={mockShow}/>);
    })

    it('should render ShowCard with appropriate props', () => {
        expect(ShowCard).toHaveBeenLastCalledWith(
            {
                id: mockShow.id, title: mockShow.title, description: mockShow.description, average_rating: mockShow.average_rating, image_url: mockShow.image_url, no_of_reviews: mockShow.no_of_reviews
            },
            expect.anything()
        )
    })
    
});