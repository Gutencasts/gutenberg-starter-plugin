import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HelloWorldBlock, { HelloWorldAttributes } from '../edit';
import '@testing-library/jest-dom';

jest.mock('@wordpress/block-editor', () => ({
  // Uncomment if you have a RichText field
  // RichText: jest.fn((props) => (
  //     <input
  //         value={props.value}
  //         placeholder={props.placeholder}
  //         onChange={(event: ChangeEvent<HTMLInputElement>): void => props.onChange(event?.target?.value)}
  //         data-testid={props['data-testid']}
  //     />
  // )),
  InspectorControls: jest.fn(({ children }) => <div>{children}</div>),
}));

let mockEditAttributes: HelloWorldAttributes;
const setAttributes = jest
  .fn()
  .mockImplementation((newAttributes: HelloWorldAttributes) => {
    mockEditAttributes = { ...mockEditAttributes, ...newAttributes };
  });

beforeEach(() => {
  setAttributes.mockClear();
  mockEditAttributes = {
    title: '',
  };
});

describe('Hello world block', () => {
  it('should update the title attribute', async () => {
    const {
      container, rerender, getByLabelText, getByText,
    } = render(<HelloWorldBlock
      isSelected
      clientId="hello-world-1"
      attributes={mockEditAttributes}
      setAttributes={setAttributes}
    />);

    const initialTitle = getByText('Hello world');

    expect(initialTitle).toBeInTheDocument();
    expect(initialTitle).toBeVisible();

    const titleField = getByLabelText('Title');

    expect(titleField).toBeVisible();

    await userEvent.type(titleField, 'My title');

    expect(setAttributes).toHaveBeenCalledWith({
      title: 'My title',
    });

    rerender(<HelloWorldBlock
      isSelected
      clientId="hello-world-1"
      attributes={mockEditAttributes}
      setAttributes={setAttributes}
    />);

    const title = getByText('Hello World from: My title');

    expect(title).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
