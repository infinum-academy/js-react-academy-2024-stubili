
import { render, screen } from '@testing-library/react';
import ReviewItem from './ReviewItem';

jest.mock("./ReviewItem", () => {
    ReviewItem: jest.fn();
})


describe('ReviewItem', () => {
    
    const mockReview = {
        review: {
            id: 0,
            comment: "mockComment",
            rating: 3,
            show_id: 1,
            user: {
                id: "mockID",
                email: "mockEmail",
                image_url: "mockURL"
            }

        },
        onDelete: () => void
    };
    
    beforeEach(() => {
        render(<ReviewItem review={mockReview.review} onDelete={mockReview.onDelete}/>);
    })

    it('should render ReviewItem with appropriate props', () => {
        expect(ReviewItem).toHaveBeenLastCalledWith(
            {
               review: mockReview.review,
               onDelete: mockReview.onDelete
            },
            expect.anything()
        )
    })
    
});