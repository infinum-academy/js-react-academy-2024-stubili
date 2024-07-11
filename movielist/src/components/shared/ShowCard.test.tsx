
import { render, screen } from '@testing-library/react';
import { ShowCard } from './ShowCard';

describe('ShowCard', () => {
    const mockCard = {id:0, title:"title", description: "description", average_rating: 3, image_url: "", no_of_reviews: 3};
    it('should render title', () => {
        render(<ShowCard show={mockCard} />)
    })

    const title = screen.getByDisplayValue("title");
    expect(title).toBeInTheDocument();
});