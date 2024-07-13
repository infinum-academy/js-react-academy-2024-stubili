
import { render, screen } from '@testing-library/react';
import ReviewItem from './ReviewItem';

describe('ReviewItem', () => {
    const mockReview = {
            reviewText: "review text",
            score: 5
    };
    it('should render rating', () => {
        render(<ReviewItem review={mockReview} onDelete={() => {}} />)

        const rating = screen.getByText("5 / 5");
        expect(rating).toBeInTheDocument();
    })

    it('should render review comment', () => {
        render(<ReviewItem review={mockReview} onDelete={() => {}} />)

        const comment = screen.getByText("review text");
        expect(comment).toBeInTheDocument();
    })

    it('should render delete button', () => {
        render(<ReviewItem review={mockReview} onDelete={() => {}} />)

        const deleteButton = screen.getByRole("button");
        expect(deleteButton).toBeInTheDocument();
    })

    it('should call onDelete when delete button is clicked', () => {
        const mockOnDelete = jest.fn();
        render(<ReviewItem review={mockReview} onDelete={mockOnDelete} />)

        const deleteButton = screen.getByRole("button");
        deleteButton.click();

        expect(mockOnDelete).toHaveBeenCalled();
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith(mockReview);
    })
});