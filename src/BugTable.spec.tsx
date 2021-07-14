import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import BugTable from './BugTable';
import { BugPriority, IBug } from './IBug';

test('the bug table should display a list of bugs', () => {
    const bugList: IBug[] = [
        {id: '1234', description: 'A test bug', priority: BugPriority.LOW},
        {id: '2345', description: 'Another test bug', priority: BugPriority.MEDIUM},
        {id: '3456', description: 'One more test bug', priority: BugPriority.LOW}
    ];

    render(<BugTable bugs={bugList} onDeleteBug={() => {}}/>);
    const rows = screen.getAllByRole('row');
    for (let index = 1; index < rows.length; index += 1) {
        expect(rows[index]).toHaveTextContent(bugList[index - 1].description);
    } 
});

test('the resolved button should remove the bug', () => {
    let bugList: IBug[] = [
        {id: '1234', description: 'A test bug', priority: BugPriority.LOW},
        {id: '2345', description: 'Another test bug', priority: BugPriority.MEDIUM},
        {id: '3456', description: 'One more test bug', priority: BugPriority.LOW}
    ];

    const removeFirstBug = (id : string) => {
        console.log('Removed Bug: ', id)
        bugList = bugList.filter(bug => bug.id !== id);
    }

    const { rerender } = render(<BugTable bugs={bugList} onDeleteBug={(id: string) => {removeFirstBug(id)}}/>);
    fireEvent.click(screen.getAllByText('Resolved')[0]);
    rerender(<BugTable bugs={bugList} onDeleteBug={(id: string) => {removeFirstBug(id)}}/>);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
    for (let index = 1; index < rows.length; index += 1) {
        expect(rows[index]).toHaveTextContent(bugList[index - 1].description);
    } 
});