
import { render, screen } from '@testing-library/react';
import { ShowCard } from './ShowCard';
import ShowDetails from '../features/shows/ShowDetails';

describe('ShowCard', () => {
    const mockCard = {id:0, title:"title", description: "description", average_rating: 3, image_url: "", no_of_reviews: 3};
    it('should render title', () => {
        render(<ShowCard show={mockCard} />)

        const title = screen.getByText("title");
        const rating = screen.getByDisplayValue(3);
        expect(title).toBeInTheDocument();
        expect(rating).toBeInTheDocument();
    })

    it('should render average rating', () => {
        render(<ShowCard show={mockCard} />)

        const rating = screen.getByText("3.0 / 5");
        expect(rating).toBeInTheDocument();
    })

    it('should contain image', () => {
        render(<ShowCard show={mockCard} />)

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src","https://via.placeholder.com/150");
    })
});