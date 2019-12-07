import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useRafDebouncedValue } from './useRafDebouncedValue';

const MOCKED_RAF_TIMEOUT = 16;

const Component = ({ value }: { value: string }) => {
  const [debouncedValue] = useRafDebouncedValue<string>(value);

  return <div>{debouncedValue}</div>;
};

describe('useRafDebouncedValue', () => {
  beforeEach(() => {
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) =>
        setTimeout(callback, MOCKED_RAF_TIMEOUT),
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('uses passed value as default, and returns it on first render', () => {
    const output = mount(<Component value={'initialValue'} />);

    expect(output.text()).toEqual('initialValue');
  });

  it('updates rendered value on prop change', () => {
    jest.useFakeTimers();

    const output = mount(<Component value={'initialValue'} />);

    expect(output.text()).toEqual('initialValue');

    act(() => {
      output.setProps({ value: 'updatedValue' });
    });

    expect(output.text()).toEqual('initialValue');

    act(() => {
      jest.advanceTimersByTime(MOCKED_RAF_TIMEOUT);
    });

    expect(output.text()).toEqual('updatedValue');
  });

  it('debounces multiple calls, and renders the last value provided', () => {
    jest.useFakeTimers();

    const output = mount(<Component value={'initialValue'} />);

    expect(output.text()).toEqual('initialValue');

    act(() => {
      output.setProps({ value: 'updatedValue' });
    });

    expect(output.text()).toEqual('initialValue');

    act(() => {
      output.setProps({ value: 'lastValue' });
    });

    act(() => {
      jest.advanceTimersByTime(MOCKED_RAF_TIMEOUT);
    });

    expect(output.text()).toEqual('lastValue');
  });
});
